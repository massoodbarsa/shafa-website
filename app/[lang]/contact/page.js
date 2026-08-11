"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Link,
  CircularProgress,
} from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SendIcon from "@mui/icons-material/Send";
import LayoutWrapper from "@/components/LayoutWrapper";
// import { useSnackbar } from "notistack";

export default function ContactPage() {
  // const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("../api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message");
      }

      setSubmitted(true);

      // enqueueSnackbar("Thank you! Your message has been sent successfully.", {
      //   variant: "success",
      // });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      enqueueSnackbar("Something went wrong. Please try again later.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutWrapper>
      <Container
        maxWidth="xl"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 4, md: 5 },
          px: { xs: 2, md: 3 },
        }}
      >
        {/* Page Title */}
        <Box sx={{ textAlign: "center", maxWidth: 700 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "serif",
              fontWeight: 400,
              letterSpacing: "0.12em",
              color: "primary.main",
              fontSize: { xs: "1.8rem", md: "2.4rem" },
              mb: 1.5,
            }}
          >
            CONTACT
          </Typography>

          <Typography
            sx={{
              fontFamily: "serif",
              fontWeight: 300,
              color: "rgba(255,255,255,0.85)",
              fontSize: { xs: "1rem", md: "1.15rem" },
              lineHeight: 1.7,
            }}
          >
            Begin your journey toward inner calm. Reach out and we will respond
            with care.
          </Typography>
        </Box>

        {/* Contact info + Form */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 6 },
            alignItems: "flex-start",
          }}
        >
          {/* LEFT – Contact Info */}
          <Box
            sx={{
              flex: { md: "0 0 340px" },
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Stack spacing={3.5}>
              {/* Address */}
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
                  <LocationOnOutlinedIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: "1.4rem",
                    }}
                  />

                  <Typography
                    sx={{
                      fontFamily: "serif",
                      letterSpacing: "0.08em",
                      color: "primary.main",
                      fontSize: "0.95rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Studio
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.88)",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    pl: 4.2,
                  }}
                >
                  24 Serenity Lane
                  <br />
                  Quiet District
                  <br />
                  Your City, 00000
                </Typography>
              </Box>

              {/* Phone */}
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
                  <PhoneOutlinedIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: "1.4rem",
                    }}
                  />

                  <Typography
                    sx={{
                      fontFamily: "serif",
                      letterSpacing: "0.08em",
                      color: "primary.main",
                      fontSize: "0.95rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Phone
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.88)",
                    fontWeight: 300,
                    pl: 4.2,
                  }}
                >
                  <Link
                    href="tel:+1234567890"
                    underline="hover"
                    sx={{ color: "inherit" }}
                  >
                    +1 (234) 567-890
                  </Link>
                </Typography>
              </Box>

              {/* Email */}
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
                  <EmailOutlinedIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: "1.4rem",
                    }}
                  />

                  <Typography
                    sx={{
                      fontFamily: "serif",
                      letterSpacing: "0.08em",
                      color: "primary.main",
                      fontSize: "0.95rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Email
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.88)",
                    fontWeight: 300,
                    pl: 4.2,
                  }}
                >
                  <Link
                    href="mailto:hello@shafa-wellness.com"
                    underline="hover"
                    sx={{ color: "inherit" }}
                  >
                    hello@shafa-wellness.com
                  </Link>
                </Typography>
              </Box>

              {/* Hours */}
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
                  <AccessTimeOutlinedIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: "1.4rem",
                    }}
                  />

                  <Typography
                    sx={{
                      fontFamily: "serif",
                      letterSpacing: "0.08em",
                      color: "primary.main",
                      fontSize: "0.95rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Hours
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.88)",
                    fontWeight: 300,
                    lineHeight: 1.8,
                    pl: 4.2,
                  }}
                >
                  Mon – Fri &nbsp;&nbsp; 10:00 – 18:00
                  <br />
                  Saturday &nbsp;&nbsp; 11:00 – 15:00
                  <br />
                  Sunday &nbsp;&nbsp;&nbsp; By appointment
                </Typography>
              </Box>

              {/* Soft note */}
              <Typography
                sx={{
                  mt: 1,
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                }}
              >
                All sessions are private and confidential.
                <br />
                We reply within 24 hours.
              </Typography>
            </Stack>
          </Box>

          {/* RIGHT – Form */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Paper
              elevation={0}
              sx={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(201,151,69,0.25)",
                borderRadius: 3,
                p: { xs: 3, md: 4 },
              }}
            >
              {submitted ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <SpaIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: "2.8rem",
                      mb: 2,
                    }}
                  />

                  <Typography
                    sx={{
                      fontFamily: "serif",
                      color: "primary.main",
                      fontSize: "1.5rem",
                      mb: 1,
                    }}
                  >
                    Thank you
                  </Typography>

                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.85)",
                      fontWeight: 300,
                      maxWidth: 360,
                      mx: "auto",
                    }}
                  >
                    Your message has been received. We will respond with care
                    shortly.
                  </Typography>

                  <Button
                    onClick={() => setSubmitted(false)}
                    sx={{
                      mt: 3,
                      color: "secondary.main",
                      fontFamily: "serif",
                    }}
                  >
                    Send another message
                  </Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2.5,
                    }}
                  >
                    {/* Name + Email */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: {
                          xs: "column",
                          sm: "row",
                        },
                        gap: 2.5,
                      }}
                    >
                      <TextField
                        fullWidth
                        name="name"
                        label="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        disabled={loading}
                        sx={fieldStyles}
                      />

                      <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        disabled={loading}
                        sx={fieldStyles}
                      />
                    </Box>

                    {/* Phone + Subject */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: {
                          xs: "column",
                          sm: "row",
                        },
                        gap: 2.5,
                      }}
                    >
                      <TextField
                        fullWidth
                        name="phone"
                        label="Phone (optional)"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="outlined"
                        disabled={loading}
                        sx={fieldStyles}
                      />

                      <TextField
                        fullWidth
                        name="subject"
                        label="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        variant="outlined"
                        disabled={loading}
                        sx={fieldStyles}
                      />
                    </Box>

                    {/* Message */}
                    <TextField
                      fullWidth
                      name="message"
                      label="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={5}
                      variant="outlined"
                      disabled={loading}
                      sx={fieldStyles}
                    />

                    {/* Submit */}
                    <Button
                      type="submit"
                      fullWidth
                      disabled={loading}
                      endIcon={
                        loading ? (
                          <CircularProgress
                            size={20}
                            sx={{ color: "#1a1a1a" }}
                          />
                        ) : (
                          <SendIcon />
                        )
                      }
                      sx={{
                        mt: 0.5,
                        py: 1.6,
                        fontFamily: "serif",
                        letterSpacing: "0.12em",
                        fontSize: "0.95rem",
                        fontWeight: 400,
                        color: "#1a1a1a",
                        background:
                          "linear-gradient(135deg, #c99745 0%, #e8c98a 100%)",
                        borderRadius: 2,
                        textTransform: "uppercase",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #b8863a 0%, #d4b87a 100%)",
                        },
                        "&.Mui-disabled": {
                          color: "#1a1a1a",
                          opacity: 0.7,
                          background:
                            "linear-gradient(135deg, #c99745 0%, #e8c98a 100%)",
                        },
                      }}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </Box>
                </Box>
              )}
            </Paper>
          </Box>
        </Box>
      </Container>
    </LayoutWrapper>
  );
}

/* Shared field styles */
const fieldStyles = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    fontFamily: "serif",
    fontWeight: 300,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 2,

    "& fieldset": {
      borderColor: "rgba(201,151,69,0.35)",
    },

    "&:hover fieldset": {
      borderColor: "rgba(201,151,69,0.6)",
    },

    "&.Mui-focused fieldset": {
      borderColor: "secondary.main",
    },
  },

  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.6)",
    fontFamily: "serif",
    fontWeight: 300,

    "&.Mui-focused": {
      color: "secondary.main",
    },
  },
};
