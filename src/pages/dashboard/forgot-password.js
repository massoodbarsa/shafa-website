import { useState } from "react";

import { TextField, Button, Typography, Container, Box } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simplified email sending function
  const sendResetEmail = async (email) => {
    try {
      const response = await fetch("/api/auth/newpass-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send email");
      }

      return await response.json();
    } catch (error) {
      console.error("Email error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    setLoading(true);

    if (!email) {
      setError("Please enter your email address.");
      setLoading(false);
      return;
    }

    try {
      await sendResetEmail(email);
      setSuccess(
        "Check your email for a link to reset your password. If you don't see it, check your spam folder."
      );
      setLoading(false);
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");

      setLoading(false);
    }
  };

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
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: "100%" }}
        >
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
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
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Is sending..." : "Send Reset Link"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
