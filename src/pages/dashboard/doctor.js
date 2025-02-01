"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import useAuthStore from "../../store/authStore"; // Fetch doctor info from store
import { supabase } from "../../utils/supabase";

import { UserRole } from "@/enums/UserRole";

const DoctorProfile = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore(); // Get doctor data from store
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    speciality: user?.speciality || "",
    profileImage: user?.profileImage || "",
  });

  console.log(user.role === UserRole.Doctor);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = `doctors/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("profile_pictures")
      .upload(fileName, file);

    if (error) {
      console.error("Image Upload Error:", error.message);
      return;
    }

    const publicUrl = supabase.storage
      .from("profile_pictures")
      .getPublicUrl(fileName);
    setFormData({ ...formData, profileImage: publicUrl.publicUrl });
  };

  const handleSubmit = async () => {
    console.log(formData);
    // const { data, error } = await supabase
    //   .from("doctors")
    //   .update({
    //     firstName: formData.firstName,
    //     lastName: formData.lastName,
    //     speciality: formData.speciality,
    //     profileImage: formData.profileImage,
    //   })
    //   .eq("user_id", doctor?.user_id);

    // if (error) {
    //   console.error("Update Error:", error.message);
    //   return;
    // }

    // setDoctor({ ...doctor, ...formData }); // Update the store with new doctor data
    // alert("Profile updated successfully!");
  };

  useEffect(() => {
    if (user) {
      setEditable(true); // Allow editing if logged-in user is a user
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Avatar
          src={formData.profileImage}
          sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
        />
        {editable && (
          <Button variant="contained" component="label">
            Upload Photo
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
        )}
      </Box>

      <Box
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 4,
          bgcolor: "background.paper",
        }}
      >
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          margin="normal"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          disabled={!editable}
        />
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          margin="normal"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          disabled={!editable}
        />
        <TextField
          fullWidth
          label="Speciality"
          variant="outlined"
          margin="normal"
          name="speciality"
          value={formData.speciality}
          onChange={handleChange}
          disabled={!editable}
        />

        {editable && (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default DoctorProfile;
