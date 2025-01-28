"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Container,
} from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PersonIcon from "@mui/icons-material/Person";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Validation schema
const schema = yup.object().shape({
  first_name: yup.string().required("Full name is required"),
  last_name: yup.string().required("Full name is required"),

  specialty: yup.string().required("Specialty is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^(?!.*[-_.]{2})[a-zA-Z0-9][a-zA-Z0-9-_.]{1,62}[a-zA-Z0-9]@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/,
      "Must follow: 3-64 chars, no special chars at start/end"
    )
    .transform((value) => value.toLowerCase().trim()),
  license_number: yup
    .string()
    .matches(/^[A-Za-z0-9-]+$/, "Invalid license number format")
    .required("Medical license number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain at least one uppercase, one lowercase, and one number"
    )
    .required("Password is required"),
});

const RegisterForm = () => {
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userType, setUserType] = useState("doctor"); // 'client' or 'doctor'

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      specialty: "",
      license_number: "",
      userType: "doctor", // dynamic field
    },
  });

  const onSubmit = async (formData) => {
    setServerError("");
    setSuccessMessage("");

    try {
      // Step 1: Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password.trim(),
        options: {
          data: {
            user_type: "doctor",
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
          emailConfirm: true,
        },
        headers: {
          "X-Supabase-Skip-Email-Validation": "true",
        },
      });

      if (authError) {
        console.log("Auth Error Details:", authError);
        const errorMsg = authError.message?.toLowerCase();
        if (errorMsg?.includes("already")) {
          throw new Error("EMAIL_EXISTS");
        }
        throw authError;
      }

      // Step 2: Ensure the user was created
      const { user } = authData;

      if (!user?.id) {
        throw new Error("User creation failed. Missing user ID.");
      }

      // Step 3: Check for existing doctor profile
      const { data: existingDoctor, error: existingDoctorError } =
        await supabase
          .from("doctor")
          .select("id")
          .eq("user_id", user.id)
          .single();

      if (existingDoctorError && existingDoctorError.code !== "PGRST116") {
        // Unexpected error
        throw existingDoctorError;
      }

      // Step 4: Insert doctor profile only if not exists
      if (!existingDoctor) {
        const { error: insertError } = await supabase.from("doctor").insert({
          user_id: user.id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          specialty: formData.specialty,
          license_nr: formData.license_number,
        });

        if (insertError) throw insertError;
      }

      // Success handling
      setSuccessMessage(
        "Registration successful! Please check your email to verify your account."
      );
      setTimeout(() => router.push("/login"), 3000);
    } catch (error) {
      console.error("Registration Error:", error);

      console.log(error);
      if (error.code === "23503") {
        setServerError("Email already registerd.");
      }

      const errorMessage =
        error && error.code === "23503"
          ? "Email already registerd."
          : error.message?.includes("invalid email")
          ? "Please use a valid email address."
          : "Registration failed. Please try again or contact support.";

      setServerError(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ textAlign: "center", mb: 4 }}
      >
        {userType === "doctor" ? (
          <MedicalServicesIcon
            sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
          />
        ) : (
          <PersonIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
        )}
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          {userType === "doctor" ? "Register as doctor" : "Register as client"}
        </Typography>

        <ToggleButtonGroup
          color="primary"
          value={userType}
          exclusive
          onChange={(e, newValue) => setUserType(newValue)}
          sx={{ mb: 3 }}
        >
          <ToggleButton value="client">Client</ToggleButton>
          <ToggleButton value="doctor">Doctor</ToggleButton>
        </ToggleButtonGroup>

        {serverError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {serverError}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.first_name?.message}
              disabled={isSubmitting}
            />
          )}
        />

        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.last_name?.message}
              disabled={isSubmitting}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email Address"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isSubmitting}
            />
          )}
        />

        {userType === "doctor" && (
          <>
            <Controller
              name="specialty"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Medical Specialty"
                  fullWidth
                  margin="normal"
                  error={!!errors.specialty}
                  helperText={errors.specialty?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            <Controller
              name="license_number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Medical License Number"
                  fullWidth
                  margin="normal"
                  error={!!errors.license_number}
                  helperText={errors.license_number?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </>
        )}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isSubmitting}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isSubmitting}
          sx={{ mt: 3, py: 1.5 }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            `Register as ${userType === "doctor" ? "Doctor" : "Client"}`
          )}
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
