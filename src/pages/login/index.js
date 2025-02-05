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
import { useRouter } from "next/navigation";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PersonIcon from "@mui/icons-material/Person";
import { UserRole } from "@/enums/UserRole";
import useAuthStore from "../../store/authStore";
import { formatUserNameForURL } from "@/src/utils/formatUserNameForURL";

const LoginPage = () => {
  const [userType, setUserType] = useState(UserRole.Doctor);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [medicalLicense, setMedicalLicense] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  const { login, setUser, setAuth, isLoggedIn, user } = useAuthStore(); // Import setUser function

  useEffect(() => {
    // If the user is already logged in, redirect them
    if (user && isLoggedIn) {
      const dashboardPath = user.license_nr // Check if user is a doctor
        ? `/dashboard/doctor/${user.first_name}-${user.last_name}`
        : `/dashboard/client`;
      router.push(dashboardPath);
    } else {
      setIsChecking(false); // Allow login page to render if not authenticated
    }
  }, [router, isLoggedIn, user]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const body =
        userType === UserRole.Doctor
          ? { email, password, medicalLicense }
          : { email, password };

      // Simulated API call - replace with actual endpoint
      const response = await fetch(
        `/api/auth/${userType.toLocaleLowerCase()}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (data.error === "Email not confirmed") {
        throw new Error(
          "Please activate your account by confirming your email."
        );
      }

      if (!response.ok) throw new Error("Login failed");

      const userData =
        userType === UserRole.Doctor ? data.doctorProfile : data.clientData;

      if (!userData) {
        throw new Error("Invalid user data received");
      }

      console.log(userData);

      login();
      setUser(data.userData); // Store user info
      setAuth({ email: data.user.email, id: data.user.id }); //store auth data

      localStorage.setItem("user_data", JSON.stringify(userData));
      localStorage.setItem(
        "auth_token",
        JSON.stringify({ email: data.user.email, id: data.user.id })
      );

      router.push(
        userType === UserRole.Doctor
          ? `/dashboard/doctor/${formatUserNameForURL(
              data.doctorProfile.first_name,
              data.doctorProfile.last_name
            )}`
          : "/"
      );
    } catch (err) {
      console.log(err);
      setError(err.message || "Invalid credentials. Please try again.");
    }
  };

  if (isChecking) return null; // Prevent flashing the login form

  return (
    <Container maxWidth="sm">
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
