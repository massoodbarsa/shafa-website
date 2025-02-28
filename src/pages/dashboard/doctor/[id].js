"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import { LoadingButton } from "@mui/lab";
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
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [specialities, setSpecialities] = useState([]);
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

  const { id } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useBreakpointDown();

  // Load country names
  countries.registerLocale(enLocale);
  const countryList = Object.entries(countries.getNames("en")).map(
    ([code, name]) => ({
      code,
      label: name,
      flag: `https://flagcdn.com/w40/${code.toLowerCase()}.png`,
    })
  );

  const containsFarsi = (text) => /[\u0600-\u06FF]/.test(text);

  // Fetch specialties from Supabase
  const fetchSpecialities = async () => {
    try {
      const { data, error } = await supabase
        .from("specialities")
        .select("name, farsi_name");
      if (error) throw error;
      setSpecialities(data || []);
    } catch (error) {
      console.error("Error fetching specialties:", error.message);
    }
  };

  const validateFields = () => {
    let isValid = true;

    if (formData.phone && !/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      setPhoneError("Enter a valid phone number (7-15 digits).");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (!formData.address || formData.address.length < 6) {
      setAddressError("Address must be at least 6 characters.");
      isValid = false;
    } else {
      setAddressError("");
    }

    if (formData.website.trim() !== "") {
      const websiteRegex =
        /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/gm;
      if (!websiteRegex.test(formData.website)) {
        setWebsiteError("Enter a valid website (e.g., example.com)");
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

    setLoading(true);
    try {
      const fileName = `doctors/${Date.now()}-${file.name}`;
      const existingImageUrl = formData.profileImage;

      if (existingImageUrl) {
        const existingFileName = existingImageUrl.split("/").pop();
        const { error: deleteError } = await supabase.storage
          .from("profile_pictures")
          .remove([`doctors/${existingFileName}`]);
        if (deleteError) throw deleteError;
      }

      const { error: uploadError } = await supabase.storage
        .from("profile_pictures")
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("profile_pictures")
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from("doctors")
        .update({ profile_image: publicUrlData.publicUrl })
        .eq("user_id", user.user_id);
      if (updateError) throw updateError;

      setFormData({ ...formData, profileImage: publicUrlData.publicUrl });
    } catch (error) {
      console.error("Error uploading image:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!doctorData || !validateFields()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("doctors")
        .update({
          description: formData.description,
          phone: formData.phone,
          location: formData.location,
          location_flag: formData.locationFlag,
          address: formData.address,
          website: formData.website,
        })
        .eq("user_id", doctorData.user_id);

      if (error) throw error;

      const { data: updatedDoctor, error: fetchError } = await supabase
        .from("doctors")
        .select("*")
        .eq("user_id", doctorData.user_id)
        .single();

      if (fetchError) throw fetchError;

      setDoctorData(updatedDoctor);
      setFormData((prev) => ({
        ...prev,
        description: updatedDoctor.description,
        phone: updatedDoctor.phone,
        location: updatedDoctor.location,
        locationFlag: updatedDoctor.location_flag,
        address: updatedDoctor.address,
        website: updatedDoctor.website,
      }));

      enqueueSnackbar("Your data is updated.", { variant: "success" });
    } catch (error) {
      console.error("Error updating profile:", error.message);
      enqueueSnackbar("Failed to update profile.", { variant: "error" });
    } finally {
      setLoading(false);
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
      const total = data.reduce((sum, review) => sum + review.rating, 0);
      const average = data.length > 0 ? total / data.length : 0;
      setFormData((prev) => ({ ...prev, averageRating: average }));
    }
  };

  const handleSubmitReview = async () => {
    if (newReview.rating === 0) {
      enqueueSnackbar("Please select a rating.", { variant: "warning" });
      return;
    }

    setLoading(true);
    try {
      const { data: existingReview, error: checkError } = await supabase
        .from("reviews")
        .select("id")
        .eq("doctor_id", doctorData.id)
        .eq("client_id", user.id)
        .single();

      if (checkError && checkError.code !== "PGRST116") throw checkError;

      if (user?.id === doctorData?.id) {
        enqueueSnackbar("You cannot review your own profile.", {
          variant: "error",
        });
        return;
      }

      if (existingReview) {
        enqueueSnackbar("You have already reviewed this doctor.", {
          variant: "error",
        });
        return;
      }

      const { error: insertError } = await supabase.from("reviews").insert([
        {
          doctor_id: doctorData.id,
          client_id: user.id,
          rating: newReview.rating,
          review_text: newReview.review_text,
        },
      ]);

      if (insertError) throw insertError;

      fetchReviews();
      setNewReview({ rating: 0, review_text: "" });
      enqueueSnackbar("Review submitted successfully.", { variant: "success" });
    } catch (error) {
      console.error("Error submitting review:", error.message);
      enqueueSnackbar("Failed to submit review.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchDoctorData = async () => {
        try {
          const { data, error } = await supabase
            .from("doctors")
            .select("*")
            .eq("id", id)
            .single();

          if (error) throw error;

          if (data) {
            setDoctorData(data);
            setFormData({
              firstName: data.first_name || "",
              lastName: data.last_name || "",
              speciality: data.speciality || "",
              profileImage: data.profile_image || "",
              email: data.email || "",
              phone: data.phone || "",
              description: data.description || "",
              location: data.location || "",
              locationFlag: data.location_flag || "",
              averageRating: null,
              address: data.address || "",
              website: data.website || "",
            });

            if (
              user?.user_id === data.user_id &&
              !["Pending", "Cancelled", "Expired"].includes(data.status)
            ) {
              setEditable(true);
            } else if (
              user?.user_id === data.user_id && ["Pending", "Cancelled", "Expired"].includes(data.status)
            ) {
              enqueueSnackbar(
                `Your account status is ${data.status}. Editing is not possible.`,
                { variant: "error" }
              );
              setEditable(false);
            }
          }
        } catch (error) {
          console.error("Error fetching doctor data:", error.message);
        }
      };

      fetchDoctorData();
      fetchSpecialities();
    }
  }, [id, user]);

  useEffect(() => {
    if (doctorData) {
      fetchReviews();
    }
  }, [doctorData]);

  if (!doctorData) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  const farsiSpeciality =
    specialities.find((spec) => spec.name === formData.speciality)
      ?.farsi_name || "";

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
          sx={{ width: 160, height: 200, mx: "auto", mb: 2 }}
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
            flexDirection={isMobile ? "column" : "row"}
            alignItems="center"
            justifyContent={isMobile ? "flex-start" : "space-between"}
          >
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
                ({formData.averageRating?.toFixed(1) || 0})
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" mt={1} gap={1}>
            <Chip
              label={formData.speciality.toUpperCase()}
              color="success"
              variant="outlined"
            />

            {farsiSpeciality && (
              <Chip
                label={farsiSpeciality}
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
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
                  if (/^[0-9+\-\s()]*$/.test(input)) {
                    setFormData({ ...formData, phone: input });
                  }
                }}
                error={!!phoneError}
                helperText={phoneError}
              />
            ) : (
              <Typography>{formData.phone || "Not provided"}</Typography>
            )}
          </Box>
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
                {formData.location || "Not provided"}
                {formData.locationFlag && (
                  <img
                    src={formData.locationFlag}
                    alt={formData.location}
                    width="20"
                    height="14"
                    style={{ marginRight: 8 }}
                  />
                )}
              </Typography>
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
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                error={!!addressError}
                helperText={addressError}
              />
            ) : (
              <Typography>{formData.address || "Not provided"}</Typography>
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
                helperText={websiteError}
              />
            ) : (
              <Typography>
                {formData.website ? (
                  <a
                    href={
                      formData.website.startsWith("http")
                        ? formData.website
                        : `https://${formData.website}`
                    }
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
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="body1"
            mt={3}
            sx={{
              whiteSpace: "pre-line",
              direction: "unset", // Remove forced direction
              unicodeBidi: "plaintext", // Let browser handle bidi naturally
              textAlign: "justify", // Justify for readability, adjust as needed
            }}
          >
            {formData.description || "No description provided"}
          </Typography>
          {editable && (
            <Box mt={3}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={6}
                name="description"
                value={formData.description}
                onChange={handleChange}
                InputProps={{
                  sx: {
                    direction: "unset", // Match Typography for consistency
                    unicodeBidi: "plaintext", // Natural bidi for input
                    textAlign: "left", // Default left for input, adjust if needed
                  },
                }}
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
        }
      />
    </Container>
  );
};

export default DoctorProfile;
