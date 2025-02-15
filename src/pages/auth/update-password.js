import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

const UpdatePassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState(""); // Initialize with empty string
  const [token, setToken] = useState(""); // Initialize with empty string
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isReady, setIsReady] = useState(false);

  // Wait for router to be ready
  useEffect(() => {
    if (router.isReady) {
      const { email: urlEmail, token: urlToken } = router.query;

      // Decode URL parameters
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

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate inputs
    if (!email || !token) {
      setError("Reset link is invalid");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }), // Email not needed here
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Password update failed");

      setSuccess("Password updated! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      setError(error.message);
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
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            sx={{ mt: 2 }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            // disabled={loading}
          >
            Update Password
            {/* {loading ? "Updating..." : "Update Password"} */}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdatePassword;
