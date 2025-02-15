import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useSnackbar } from "notistack";

const UpdatePassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar(); // Initialize notistack

  // Wait for router to be ready
  useEffect(() => {
    if (router.isReady) {
      const { email: urlEmail, token: urlToken } = router.query;

      try {
        const decodedEmail = decodeURIComponent(urlEmail);
        const decodedToken = decodeURIComponent(urlToken);

        if (!decodedEmail || !decodedToken) {
          throw new Error("Invalid reset link");
        }

        setEmail(decodedEmail);
        setToken(decodedToken);
        setIsReady(true);
      } catch (error) {
        setError("Corrupted reset link. Request a new one.");
      }
    }
  }, [router.isReady, router.query]);

  // Password validation function
  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[\W_]/;

    if (!minLength.test(password)) {
      return "Password must be at least 8 characters";
    }
    if (!hasUppercase.test(password)) {
      return "Password must include at least one uppercase letter";
    }
    if (!hasLowercase.test(password)) {
      return "Password must include at least one lowercase letter";
    }
    if (!hasNumber.test(password)) {
      return "Password must include at least one number";
    }
    if (!hasSpecialChar.test(password)) {
      return "Password must include at least one special character";
    }

    return "";
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    setPasswordError(validatePassword(password));
  };

  const handleConfirmPasswordChange = (e) => {
    const password = e.target.value;
    setConfirmPassword(password);
    setConfirmPasswordError(
      password !== newPassword ? "Passwords do not match" : ""
    );
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email || !token) {
      setError("Reset link is invalid");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");

      setLoading(false);
      return;
    }

    if (passwordError || confirmPasswordError) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Password update failed");

      setLoading(false);
      setSuccess("Password updated! Redirecting to login...");

      enqueueSnackbar("Password updated.", {
        variant: "success",
      });

      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (!isReady) return <div>Loading...</div>;

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Update Password</Typography>

        <Box component="form" sx={{ mt: 3, width: "100%" }}>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={handleNewPasswordChange}
            error={!!passwordError}
            helperText={passwordError}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            sx={{ mt: 2 }}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
          />

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" sx={{ mt: 2 }}>
              {success}
            </Typography>
          )}

          <Button
            onClick={handlePasswordUpdate}
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={
              loading || passwordError || confirmPasswordError || !newPassword
            }
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdatePassword;
