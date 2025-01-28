import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { supabase } from "../utils/supabase";
import { hashPassword } from "../utils/hashPassword";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  specialty: yup.string().required("Specialty is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const DoctorRegistrationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { error } = await supabase.from("doctor").insert([
      {
        name: data.name,
        specialty: data.specialty,
        email: data.email,
        password_hash: await hashPassword(data.password), // Use bcrypt
      },
    ]);

    if (error) alert("Registration failed!");
    else alert("Registration submitted for admin approval!");
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Doctor Registration
      </Typography>

      {/* Name Field */}
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      {/* Specialty Field */}
      <Controller
        name="specialty"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Specialty"
            fullWidth
            margin="normal"
            error={!!errors.specialty}
            helperText={errors.specialty?.message}
          />
        )}
      />

      {/* Email Field */}
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      {/* Password Field */}
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Register
      </Button>
    </Box>
  );
};

export default DoctorRegistrationForm;
