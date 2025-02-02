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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import useAuthStore from "../../../store/authStore";
import { supabase } from "../../../utils/supabase";
import LinearProgress from "@mui/material/LinearProgress";
import { LoadingButton } from "@mui/lab"; // Import LoadingButton
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useMediaQuery } from "@mui/material"; // Import useMediaQuery
import { capitalizeFirstLetter } from "@/src/utils/capitalize";

const DoctorProfile = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false); // Loading state

  const { name } = router.query; // Dynamic doctorId from the URL
  const [editable, setEditable] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    speciality: "",
    profileImage: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    location: "",
  });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm")); // Check for mobile

  // Load country names
  countries.registerLocale(enLocale);
  const countryList = Object.entries(countries.getNames("en")).map(
    ([code, name]) => ({
      code,
      label: name,
      flag: `https://flagcdn.com/w40/${code.toLowerCase()}.png`, // Flags API
    })
  );

  useEffect(() => {
    // Fetch doctor profile data only if name exists in the URL
    if (name) {
      const fullName = name.split("-").join(" "); // Join parts back into a full name

      const fetchDoctorData = async () => {
        try {
          const { data, error } = await supabase
            .from("doctors")
            .select("*")
            .eq("full_name", fullName) // Assuming full_name is the correct column
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
            });

            // Check if the logged-in user is the doctor
            if (user?.user_id === data.user_id) {
              setEditable(true);
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
  }, [name, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (event, newValue) => {
    if (newValue) {
      setFormData({ ...formData, location: newValue.label });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true); // Start loading state

    try {
      const fileName = `doctors/${Date.now()}-${file.name}`;

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("profile_pictures") // Ensure this is your actual bucket name
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL of the uploaded image
      const { data: urlData } = supabase.storage
        .from("profile_pictures")
        .getPublicUrl(fileName);

      if (!urlData.publicUrl) {
        throw new Error("Failed to retrieve public URL");
      }

      // Update the doctor's profile in the database
      const { error: updateError } = await supabase
        .from("doctors")
        .update({ profile_image: urlData.publicUrl })
        .eq("user_id", user.user_id);

      if (updateError) throw updateError;

      // Update local state
      setFormData((prev) => ({ ...prev, profileImage: urlData.publicUrl }));
    } catch (error) {
      console.error("Error uploading image:", error.message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  const handleSubmit = async () => {
    if (!doctorData) return;

    setLoading(true); // Start loading state

    try {
      // Update the doctor's description in the database
      const { error } = await supabase
        .from("doctors")
        .update({
          description: formData.description,
          phone: formData.phone, // Update phone number
          location: formData.location,
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
      }));

      console.log("Updated doctor data:", updatedDoctor);
    } catch (error) {
      console.error("Error updating description:", error.message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  if (!doctorData)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Avatar
          src={formData.profileImage}
          sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
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
                <StarIcon key={index} sx={{ color: "gold" }} />
              ))}
            </Box>

            {/* Name */}
          </Box>
          <Chip
            label={formData.speciality.toUpperCase()}
            color="primary"
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
                error={
                  formData.phone && !/^[0-9+\-\s()]{7,15}$/.test(formData.phone)
                }
                helperText={
                  formData.phone && !/^[0-9+\-\s()]{7,15}$/.test(formData.phone)
                    ? "Invalid phone number format"
                    : ""
                }
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
              <Typography>{formData.location}</Typography> // Display selected location
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
    </Container>
  );
};

export default DoctorProfile;
