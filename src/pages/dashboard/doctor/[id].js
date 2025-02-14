import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Using next/router
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
  Autocomplete,
  Divider,
  Chip,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import StarIcon from "@mui/icons-material/Star";
import useAuthStore from "../../../store/authStore";
import { supabase } from "../../../utils/supabase";
import LinearProgress from "@mui/material/LinearProgress";
import { LoadingButton } from "@mui/lab"; // Import LoadingButton
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { capitalizeFirstLetter } from "@/src/utils/capitalize";
import { useSnackbar } from "notistack";
import ReviewSubmitCard from "@/src/components/ReviewSubmitCard";
import HomeIcon from "@mui/icons-material/Home";
import { UserRole } from "@/src/enums/UserRole";
import OpenIconSpeedDial from "@/src/components/OpenIconSpeedDial";
import useBreakpointDown from "@/src/hooks/useBreakpointDown.hook";
import LanguageIcon from "@mui/icons-material/Language";

const DoctorProfile = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false); // Loading state

  const [editable, setEditable] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    speciality: "",
    profileImage: "",
    email: "",
    phone: "",
    description: "",
    location: "",
    locationFlag: "",
    averageRating: null,
    address: "",
    website: "",
  });

  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [websiteError, setWebsiteError] = useState("");

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    review_text: "",
  });

  const { id } = router.query; // Dynamic doctorId from the URL

  const { enqueueSnackbar } = useSnackbar(); // Initialize notistack

  const isMobile = useBreakpointDown();
  // Load country names
  countries.registerLocale(enLocale);
  const countryList = Object.entries(countries.getNames("en")).map(
    ([code, name]) => ({
      code,
      label: name,
      flag: `https://flagcdn.com/w40/${code.toLowerCase()}.png`, // Flags API
    })
  );

  const validateFields = () => {
    let isValid = true;

    if (!formData.phone && !/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      setPhoneError("Enter a valid phone number.");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (!formData.address || formData.address < 6) {
      setAddressError(
        "Address could not be empty and must be at least 6 characters."
      );
      isValid = false;
    } else {
      setAddressError("");
    }

    if (formData.website.trim() !== "") {
      const websiteRegex =
        /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/gm;

      if (!websiteRegex.test(formData.website)) {
        setWebsiteError(
          "Please enter a valid website (e.g., example.com or www.example.com)"
        );
        isValid = false;
      } else {
        setWebsiteError("");
      }
    }

    return isValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (event, newValue) => {
    console.log(newValue);
    if (newValue) {
      setFormData({
        ...formData,
        location: newValue.label,
        locationFlag: newValue.flag,
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true); // Start loading state

    try {
      const fileName = `doctors/${Date.now()}-${file.name}`;

      // 1. Check if the doctor already has a profile image
      const existingImageUrl = formData.profileImage;

      // If there's an existing image, delete it from the storage
      if (existingImageUrl) {
        const existingFileName = existingImageUrl.split("/").pop(); // Extract file name from URL
        const { error: deleteError } = await supabase.storage
          .from("profile_pictures")
          .remove([`doctors/${existingFileName}`]);

        if (deleteError) {
          throw deleteError;
        }
      }

      // 2. Upload new image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("profile_pictures")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 3. Get public URL of the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from("profile_pictures")
        .getPublicUrl(fileName);

      // 4. Update the doctor's profile in the database
      const { error: updateError } = await supabase
        .from("doctors")
        .update({ profile_image: publicUrlData.publicUrl })
        .eq("user_id", user.user_id);

      if (updateError) throw updateError;

      // 5. Update local state with the new image URL
      setFormData({ ...formData, profileImage: publicUrlData.publicUrl });
    } catch (error) {
      console.error("Error uploading image:", error.message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  const handleSubmit = async () => {
    if (!doctorData) return;

    if (!validateFields()) return;

    setLoading(true); // Start loading state

    try {
      // Update the doctor's description in the database
      const { error } = await supabase
        .from("doctors")
        .update({
          description: formData.description,
          phone: formData.phone, // Update phone number
          location: formData.location,
          location_flag: formData.locationFlag,
          address: formData.address,
          website: formData.website,
        })
        .eq("user_id", doctorData.user_id);

      if (error) {
        throw new Error(error.message); // Handle any errors
      }

      // Fetch updated data after saving
      const { data: updatedDoctor, error: fetchError } = await supabase
        .from("doctors")
        .select("*")
        .eq("user_id", doctorData.user_id)
        .single();

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      // Update state with new data
      setDoctorData(updatedDoctor);
      setFormData((prev) => ({
        ...prev,
        description: updatedDoctor.description,
        phone: updatedDoctor.phone,
        location: updatedDoctor.location,
        location_flag: updatedDoctor.locationFlag,
        address: updatedDoctor.address,
        website: updatedDoctor.website,
      }));

      enqueueSnackbar("Your data is updated.", {
        variant: "success",
      });

      console.log("Updated doctor data:", updatedDoctor);
    } catch (error) {
      console.error("Error updating description:", error.message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("rating, review_text, created_at, clients (full_name)")
      .eq("doctor_id", doctorData.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error.message);
    } else {
      setReviews(data);
    }
  };

  const handleSubmitReview = async () => {
    if (newReview.rating === 0) {
      enqueueSnackbar("Please select a rating before submitting.", {
        variant: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      // Check if the client has already reviewed this doctor
      const { data: existingReview, error: checkError } = await supabase
        .from("reviews")
        .select("id")
        .eq("doctor_id", doctorData.id)
        .eq("client_id", user.id)

        .single(); // Ensure only one record is fetched

      if (checkError && checkError.code !== "PGRST116") {
        throw checkError; // Ignore "PGRST116" (no rows found), as that means no review exists
      }

      if (user?.id === doctorData?.id) {
        enqueueSnackbar("You cannot review your own profile.", {
          variant: "error",
        });
        return;
      }

      if (existingReview) {
        enqueueSnackbar(
          "You have already submitted a review for this doctor.",
          { variant: "error" }
        );
        return;
      }

      // Insert new review
      const { error: insertError } = await supabase.from("reviews").insert([
        {
          doctor_id: doctorData.id,
          client_id: user.id,
          rating: newReview.rating,
          review_text: newReview.review_text,
        },
      ]);

      if (insertError) throw insertError;

      // Fetch updated reviews
      fetchReviews();
      setReviews({ rating: 0, reviewText: "" }); // Reset form
    } catch (error) {
      console.error("Error submitting review:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffects

  useEffect(() => {
    if (id) {
      const fetchDoctorData = async () => {
        try {
          const { data, error } = await supabase
            .from("doctors")
            .select("*")
            .eq("id", id) // Assuming full_name is the correct column
            .single(); // Ensure we get only one result

          if (error) {
            throw new Error(error.message); // Throw error if any issue
          }

          if (data) {
            setDoctorData(data);
            setFormData({
              firstName: data.first_name,
              lastName: data.last_name,
              speciality: data.speciality,
              profileImage: data.profile_image,
              email: data.email,
              phone: data.phone,
              location: data.location,
              description: data.description,
              location: data.location,
              locationCode: data.location_code,
              averageRating: data.avg_rating,
              address: data.address,
              website: data.website,
            });

            // Check if the logged-in user is the doctor
            if (
              user?.user_id === data.user_id &&
              !["Pending", "Cancelled", "Expired"].includes(data.status)
            ) {
              setEditable(true);
            } else {
              // If the status is one of the restricted statuses, show an error and disable editing
              if (["Pending", "Cancelled", "Expired"].includes(data.status)) {
                enqueueSnackbar(
                  `Your account status is ${data.status}. Editing is not possible.`,
                  {
                    variant: "error",
                  }
                );
                setEditable(false);
              }
            }
          } else {
            console.error("No doctor found for this name");
          }
        } catch (error) {
          console.error("Error fetching doctor data:", error.message);
        }
      };

      fetchDoctorData();
    }
  }, [id, user]);

  useEffect(() => {
    if (doctorData) {
      fetchReviews();
    }
  }, [doctorData]);

  if (!user || !doctorData)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );

  return (
    <Container maxWidth="lg">
      {user?.id === doctorData?.id && (
        <Box position="relative">
          <OpenIconSpeedDial doctorData={doctorData} />
        </Box>
      )}
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Avatar
          src={formData.profileImage}
          sx={{
            width: 160,
            height: 200,
            mx: "auto",
            mb: 2,
          }}
        />
        {editable && (
          <Button variant="contained" component="label">
            Upload Photo
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
        )}
      </Box>

      <Card
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 4,
          bgcolor: "background.paper",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"} // Stack on mobile, row on desktop
            alignItems="center"
            justifyContent={isMobile ? "flex-start" : "space-between"} // Stack or space-between based on device
          >
            {/* Stars */}
            <Typography
              variant="h5"
              gutterBottom
              sx={{ textAlign: isMobile ? "center" : "left" }}
            >
              {capitalizeFirstLetter(formData.firstName)}{" "}
              {capitalizeFirstLetter(formData.lastName)}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              sx={{ my: isMobile ? 3 : 0 }}
            >
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  sx={{
                    color:
                      index < Math.round(formData.averageRating)
                        ? "gold"
                        : "gray",
                  }}
                />
              ))}
              <Typography sx={{ ml: 1 }}>
                ({formData.averageRating || 0})
              </Typography>
            </Box>

            {/* Name */}
          </Box>
          <Chip
            label={formData.speciality.toUpperCase()}
            color="success"
            variant="outlined"
            sx={{ mt: 1 }}
          />
          <Box display="flex" alignItems="center" mt={3}>
            <EmailIcon sx={{ mr: 1 }} />
            <Typography>{formData.email}</Typography>
          </Box>
          <Box display="flex" alignItems="center" my={3}>
            <PhoneIcon sx={{ mr: 1 }} />
            {editable ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  const input = e.target.value;
                  // Allow only numbers, spaces, dashes, parentheses, and +
                  if (/^[0-9+\-\s()]*$/.test(input)) {
                    setFormData({ ...formData, phone: input });
                  }
                }}
                error={!!phoneError}
                helperText={phoneError}
              />
            ) : (
              <Typography>{formData.phone}</Typography>
            )}
          </Box>
          {/* Editable Location Field */}
          <Box display="flex" alignItems="center" my={3}>
            <AddLocationAltIcon sx={{ mr: 1 }} />
            {editable ? (
              <Autocomplete
                fullWidth
                options={countryList}
                getOptionLabel={(option) => option.label}
                value={
                  countryList.find((c) => c.label === formData.location) || null
                }
                onChange={handleLocationChange}
                renderOption={(props, option) => (
                  <li {...props}>
                    <img
                      loading="lazy"
                      width="20"
                      src={option.flag}
                      alt={option.label}
                      style={{ marginRight: 10 }}
                    />
                    {option.label}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Select Country" />
                )}
              />
            ) : (
              <Typography display="flex" alignItems="center" gap={1}>
                {formData.location}{" "}
                {doctorData.location_flag && (
                  <img
                    src={doctorData.location_flag}
                    alt={doctorData.location}
                    width="20"
                    height="14"
                    style={{ marginRight: 8 }}
                  />
                )}
              </Typography> // Display selected location
            )}
          </Box>
          <Box display="flex" alignItems="center" my={3}>
            <HomeIcon sx={{ mr: 1 }} />
            {editable ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Address"
                name="address"
                value={formData.address}
                required
                onChange={(e) => {
                  const input = e.target.value;
                  setFormData({ ...formData, address: input });
                }}
                error={!!addressError}
                helperText={addressError}
              />
            ) : (
              <Typography>{formData.phone}</Typography>
            )}
          </Box>
          <Box display="flex" alignItems="center" my={3}>
            <LanguageIcon sx={{ mr: 1 }} />
            {editable ? (
              <TextField
                fullWidth
                variant="outlined"
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                error={!!websiteError}
                helperText={websiteError} // Show validation message
              />
            ) : (
              <Typography>
                {formData.website ? (
                  <a
                    href={formData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1976d2", textDecoration: "none" }}
                  >
                    {formData.website}
                  </a>
                ) : (
                  "No website provided"
                )}
              </Typography>
            )}
          </Box>
          <Divider sx={{ my: 2 }} /> {/* Line between paragraphs */}
          <Typography variant="body1" mt={3} sx={{ whiteSpace: "pre-line" }}>
            {doctorData.description}
          </Typography>
          {editable && (
            <Box mt={3}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
                loading={loading} // Show spinner when loading
              >
                Save Changes
              </LoadingButton>
            </Box>
          )}
        </CardContent>
      </Card>
      <ReviewSubmitCard
        newReview={newReview}
        setNewReview={setNewReview}
        handleSubmitReview={handleSubmitReview}
        loading={loading}
        reviews={reviews}
        user={user}
        disableReviewForm={
          user?.id === doctorData?.id || user?.role === UserRole.Doctor
        } // Disable review form if the user is the doctor
      />
    </Container>
  );
};

export default DoctorProfile;
