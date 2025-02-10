"use client";

import React, { useState, useEffect } from "react";
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
  LinearProgress,
} from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PersonIcon from "@mui/icons-material/Person";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSnackbar } from "notistack";

import { UserRole } from "@/enums/UserRole";
import SpecialitySelect from "./SpecialitySelect";
import { Status } from "@/enums/PackageTypes";
import { formatDate } from "../utils/formatDate";

const RegisterForm = () => {
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userType, setUserType] = useState(UserRole.Doctor);
  const [loading, setLoading] = useState(false); // Loading state

  const { enqueueSnackbar } = useSnackbar(); // Initialize notistack

  // Dynamic schema based on userType
  const schema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^(?!.*[-_.]{2})[a-zA-Z0-9][a-zA-Z0-9-_.]{1,62}[a-zA-Z0-9]@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/,
        "Must follow: 3-64 chars, no special chars at start/end"
      )
      .transform((value) => value.toLowerCase().trim()),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must contain at least one uppercase, one lowercase, and one number"
      )
      .required("Password is required"),
    ...(userType === UserRole.Doctor
      ? {
          speciality: yup.string().required("speciality is required"),
          license_number: yup
            .string()
            .matches(/^[A-Za-z0-9-]+$/, "Invalid license number format")
            .required("Medical license number is required"),
        }
      : {}),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      speciality: "",
      license_number: "",
    },
  });

  useEffect(() => {
    reset(); // Reset form when userType changes
  }, [userType, reset]);

  const onSubmit = async (formData) => {
    setServerError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password.trim(),
        options: {
          data: {
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (authError) throw authError;

      const { user } = authData;
      if (!user?.id) throw new Error("User creation failed.");

      const table = userType === UserRole.Doctor ? "doctors" : "clients";

      const { data: existing, error: existingError } = await supabase
        .from(table)
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (existingError && existingError.code !== "PGRST116") {
        throw existingError;
      }

      if (!existing) {
        const insertData = {
          user_id: user.id,
          first_name: formData.first_name.toLowerCase(),
          last_name: formData.last_name.toLowerCase(),
          full_name:
            `${formData.first_name} ${formData.last_name}`.toLowerCase(),
          email: formData.email.trim(),
        };

        if (userType === UserRole.Doctor) {
          insertData.speciality = formData.speciality;
          insertData.license_nr = formData.license_number;
          insertData.role = UserRole.Doctor;
          insertData.status = Status.FREE;
          insertData.start_date = formatDate(new Date());
        }
        if (userType === UserRole.Client) {
          insertData.role = UserRole.Client;
          insertData.status = Status.FREE;
        }

        const { error: insertError } = await supabase
          .from(table)
          .insert(insertData);

        if (insertError) throw insertError;
      }

      setSuccessMessage("Registration successful! Please check your email.");

      setTimeout(() => {
        router.push("/login");
        setLoading(false); // Stop loading once the redirect happens
        enqueueSnackbar("You are successfully registerd.", {
          variant: "success",
        });
      }, 1000); // Redirect after 3 seconds
    } catch (error) {
      setLoading(false); // Stop loading once error

      console.error("Registration Error:", error);

      const errorMessage = error.message.includes("User already registered")
        ? "Email already registered."
        : error.message.includes("Invalid login credentials")
        ? "Invalid email or password."
        : "Registration failed. Please try again.";

      setServerError(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm">
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      <Box
        component="form"
        key={userType}
        onSubmit={handleSubmit(onSubmit)}
        sx={{ textAlign: "center", mb: 4 }}
      >
        {userType === UserRole.Doctor ? (
          <MedicalServicesIcon
            sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
          />
        ) : (
          <PersonIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
        )}
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          {userType === UserRole.Doctor
            ? "Register as Doctor"
            : "Register as Client"}
        </Typography>

        <ToggleButtonGroup
          color="primary"
          value={userType}
          exclusive
          onChange={(e, newValue) => setUserType(newValue)}
          sx={{ mb: 3 }}
        >
          <ToggleButton value={UserRole.Client}>Client</ToggleButton>
          <ToggleButton value={UserRole.Doctor}>Doctor</ToggleButton>
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
              error={!!errors.first_name}
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
              error={!!errors.last_name}
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

        {userType === UserRole.Doctor && (
          <>
            <SpecialitySelect
              control={control}
              errors={errors}
              disabled={isSubmitting}
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
            `Register as ${userType === UserRole.Doctor ? "Doctor" : "Client"}`
          )}
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
