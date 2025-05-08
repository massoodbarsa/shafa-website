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
import { v4 as uuidv4 } from "uuid";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSnackbar } from "notistack";

import { UserRole } from "@/src/enums/UserRole";
import SpecialitySelect from "./SpecialitySelect";
import { Status } from "@/src/enums/PackageTypes";
import { formatDate } from "../utils/formatDate";
import { capitalizeFirstLetter } from "../utils/capitalize";

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
          pin: yup
            .string()
            .matches(/^[A-Za-z0-9-]+$/, "Invalid pin format")
            .required("Pin is required"),
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
      pin: "",
    },
  });

  useEffect(() => {
    reset(); // Reset form when userType changes
  }, [userType, reset]);

  const sendVerificationEmail = async (email, link) => {
    try {
      const response = await fetch("/api/auth/send-email", {
        // Changed endpoint path
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          link,
          subject: "Verify Your Email Address",
          template: "email-verification", // Add template identifier if using email templates
        }),
      });

      const data = await response.json(); // Parse response body

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      return data;
    } catch (error) {
      console.error("Email error:", error);
      throw error; // Re-throw to handle in caller
    }
  };
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

      const token = uuidv4();

      await supabase
        .from("email_verifications")
        .insert([{ user_id: user.id, token }]);

      const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm-email?token=${token}`;
      await sendVerificationEmail(formData.email, confirmationLink);

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
          first_name: capitalizeFirstLetter(formData.first_name),
          last_name: capitalizeFirstLetter(formData.last_name),
          full_name: `${capitalizeFirstLetter(
            formData.first_name
          )} ${capitalizeFirstLetter(formData.last_name)}`,
          email: formData.email.trim(),
        };

        if (userType === UserRole.Doctor) {
          insertData.speciality = formData.speciality;
          insertData.pin = formData.pin;
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
      }, 2000); // Redirect after 3 seconds
    } catch (error) {
      setLoading(false); // Stop loading once error

      console.error("Registration Error:", error);

      if (error.message.includes("Failed to send email")) {
        setServerError(
          "Failed to send verification email. Please contact support."
        );

        await fetch("/api/delete-user/deleteUser", {
          method: "POST", // You may want to use POST depending on your API design
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            role: userType,
          }),
        });

        return;
      }

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
              name="pin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Pin"
                  fullWidth
                  margin="normal"
                  error={!!errors.pin}
                  helperText={errors.pin?.message}
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
