"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
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

const DoctorRegistrationForm = () => {
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  });
  const router = useRouter();
  const [serverError, setServerError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      specialty: "",
      email: "",
      license_number: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    setServerError("");
    setSuccessMessage("");

    try {
      // Step 1: Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(), // Normalize email
        password: formData.password.trim(), // Trim whitespace
        options: {
          data: {
            user_type: "doctor",
            name: formData.name.trim(),
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
          emailConfirm: true, // Force email confirmation
        },

        headers: {
          "X-Supabase-Skip-Email-Validation": "true",
        },
      });

      if (authError) throw authError;

      // Step 2: Create doctor profile
      const { error: profileError } = await supabase.from("doctor").insert({
        user_id: authData.user.id,
        name: formData.name,
        specialty: formData.specialty,
        license_nr: formData.license_number,
      });

      if (profileError) throw profileError;

      // Success handling
      setSuccessMessage(
        "Registration successful! Please check your email to verify your account."
      );
      setTimeout(() => router.push("/login"), 3000);
    } catch (error) {
      console.error("Registration error:", error);

      let errorMessage =
        "Registration failed. Please try again or contact support.";

      // Safely access error message
      const errorMsg = error?.message?.toLowerCase() || "";
      const supabaseErrorCode = error?.status || error?.code;

      // Handle specific Supabase error codes
      if (supabaseErrorCode === 400) {
        if (errorMsg.includes("invalid email")) {
          errorMessage =
            "Please use a valid email address from a trusted provider";
        } else if (errorMsg.includes("already registered")) {
          errorMessage = "This email is already registered";
        }
      }
      // Handle email validation errors from Supabase
      else if (error?.name === "AuthApiError" && error?.status === 400) {
        errorMessage = "Invalid email format detected by our security checks";
      }
      // Fallback for unexpected errors
      else {
        errorMessage = `Unexpected error: ${supabaseErrorCode || "unknown"}`;
      }

      setServerError(errorMessage);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3, maxWidth: 500, mx: "auto" }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        Doctor Registration
      </Typography>

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
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Full Name"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isSubmitting}
          />
        )}
      />

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
          "Register as Doctor"
        )}
      </Button>

      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="body2">
          Already have an account?{" "}
          <Button href="/login" variant="text" size="small">
            Login here
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default DoctorRegistrationForm;
