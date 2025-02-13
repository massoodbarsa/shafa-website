"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PersonIcon from "@mui/icons-material/Person";
import { UserRole } from "@/enums/UserRole";
import useAuthStore from "../../store/authStore";
import { Status } from "@/enums/PackageTypes";
import { useSnackbar } from "notistack";
import { supabase } from "../../utils/supabase";

const LoginPage = () => {
  const [userType, setUserType] = useState(UserRole.Doctor);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [medicalLicense, setMedicalLicense] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  // const [isChecking, setIsChecking] = useState(true);
  const { enqueueSnackbar } = useSnackbar(); // Initialize notistack

  const { login, setUser, setAuth, isLoggedIn, user } = useAuthStore(); // Import setUser function

  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");
  const verifyError = searchParams.get("error");

  // useEffect(() => {
  //   // If the user is already logged in, redirect them
  //   if (user && isLoggedIn) {
  //     const dashboardPath = user.license_nr // Check if user is a doctor
  //       ? `/dashboard/doctor/${user.id}`
  //       : `/`;
  //     router.push(dashboardPath);
  //   } else {
  //     setIsChecking(false); // Allow login page to render if not authenticated
  //   }
  // }, [router, isLoggedIn, user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user_data");
      const storedAuth = localStorage.getItem("auth_token");

      // Check if stored data exists and is a valid JSON string
      if (storedUser || storedAuth) {
        try {
          const parsedUser =
            storedUser && storedUser !== "undefined"
              ? JSON.parse(storedUser)
              : null;
          const parsedAuth =
            storedAuth && storedAuth !== "undefined"
              ? JSON.parse(storedAuth)
              : null;

          // Only update state if data is parsed successfully
          if (parsedUser && parsedAuth) {
            setUser(parsedUser);
            setAuth(parsedAuth);
          }
        } catch (error) {
          console.error("Error parsing stored data from localStorage:", error);
        }
      }
    }
  }, []); // Empty dependency array to run once on mount

  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       if (session) {
  //         console.log("Session updated:", session);
  //         localStorage.setItem("auth_session", JSON.stringify(session));
  //       } else {
  //         console.log("User logged out");
  //         localStorage.removeItem("auth_session");
  //       }
  //     }
  //   );

  //   return () => {
  //     authListener?.unsubscribe();
  //   };
  // }, []);

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const { data: session, error: sessionError } =
  //       await supabase.auth.getSession();
  //     if (sessionError) {
  //       console.error("Error fetching session:", sessionError);
  //     } else if (session) {
  //       console.log("Session fetched successfully", session);
  //     } else {
  //       console.log("No session found");
  //     }
  //   };

  //   fetchSession();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // 2. Check custom verification status
      const { data: profile } = await supabase
        .from(userType === UserRole.Doctor ? "doctors" : "clients")
        .select("*")
        .eq("user_id", data.user.id)
        .single();

      if (!profile?.email_verified) {
        await supabase.auth.signOut();
        throw new Error("Please verify your email first");
      }

      // 3. Proceed with login
      setUser({ ...profile }); // Store user info
      setAuth({ email: data.user.email, id: data.user.id }); //store auth data

      console.log(profile);

      router.push(
        profile.role === UserRole.Doctor
          ? `/dashboard/doctor/${profile.id}`
          : profile.role === UserRole.Admin
          ? "/dashboard/admin"
          : "/"
      );
    } catch (err) {
      setError(err.message);
      enqueueSnackbar(err.message, { variant: "error" });
      setPassword("");
      setMedicalLicense("");
    }
  };

  return (
    <Container maxWidth="sm">
      {verified && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Email successfully verified! You can now login.
        </Alert>
      )}

      {verifyError === "invalid_token" && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Invalid or expired verification link
        </Alert>
      )}

      <Box sx={{ textAlign: "center", mb: 4 }}>
        {userType === UserRole.Doctor ? (
          <MedicalServicesIcon
            sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
          />
        ) : (
          <PersonIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
        )}
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          {userType === UserRole.Doctor ? "Doctor Login" : "Client Login"}
        </Typography>

        <ToggleButtonGroup
          color="primary"
          value={userType}
          exclusive
          onChange={(e, newType) => newType && setUserType(newType)}
        >
          <ToggleButton value={UserRole.Client} sx={{ textTransform: "none" }}>
            <PersonIcon sx={{ mr: 1 }} /> I'm a Client
          </ToggleButton>
          <ToggleButton value={UserRole.Doctor} sx={{ textTransform: "none" }}>
            <MedicalServicesIcon sx={{ mr: 1 }} /> I'm a Doctor
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 4,
          backgroundColor: "background.paper",
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          margin="normal"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {userType === UserRole.Doctor && (
          <TextField
            fullWidth
            label="Medical License Number"
            variant="outlined"
            margin="normal"
            required
            value={medicalLicense}
            onChange={(e) => setMedicalLicense(e.target.value)}
          />
        )}

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Link
            href="/forgot-password"
            sx={{
              color: "text.secondary",
              fontSize: "0.9rem",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Forgot Password?
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, py: 1.5, fontSize: "1.1rem" }}
        >
          Sign In as {userType === UserRole.Doctor ? "Doctor" : "Client"}
        </Button>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body1">
            Don't have an account?{" "}
            <Link
              href="/register"
              sx={{
                color: "primary.main",
                fontWeight: 500,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
