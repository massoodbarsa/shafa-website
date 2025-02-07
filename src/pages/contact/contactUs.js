"use client";

import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Twitter, Instagram, Email, Phone } from "@mui/icons-material";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic (e.g., API call)
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{ padding: 4, marginTop: 4, borderRadius: 2, position: "relative" }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            Contact Us
          </Typography>
        </Box>

        {/* Contact Info */}
        <Box textAlign="center" mb={5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
            mb={2}
          >
            <Phone color="success" />
            <Typography variant="body1">+123 456 7890</Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <Email color="success" />
            <Typography variant="body1">contact@example.com</Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" gap={2} mb={3}>
          <IconButton href="https://twitter.com" target="_blank">
            <Twitter color="primary" />
          </IconButton>
          <IconButton href="https://instagram.com" target="_blank">
            <Instagram color="secondary" />
          </IconButton>
        </Box>

        {/* Contact Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Name"
            name="name"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Message"
            name="message"
            multiline
            rows={4}
            fullWidth
            required
            value={formData.message}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
