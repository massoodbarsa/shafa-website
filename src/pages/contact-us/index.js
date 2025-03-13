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
import { Instagram, Email, Phone } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { NextSeo } from "next-seo";

import useBreakpointDown from "@/src/hooks/useBreakpointDown.hook";
import Head from "next/head";
import Image from "next/image";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const isMobile = useBreakpointDown();

  const { enqueueSnackbar } = useSnackbar(); // Initialize notistack

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    setError(""); // Clear previous error
    setSuccess(""); // Clear previous success message

    try {
      const response = await fetch("/api/auth/contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      enqueueSnackbar("Message sent successfully!", {
        variant: "success",
      });
      setLoading(false);

      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
    } catch (error) {
      setError(error.message || "Something went wrong. Try again.");
    }
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: "Contact Iranian Doctors Hub",
              url: "https://www.iraniandoctorshub.com/contact-us",
              contactType: "Customer Service",
              email: "IranianDoctorsHub@gmail.com",
            }),
          }}
        />
      </Head>
      <NextSeo
        title="Contact Us | Farsi-Speaking Doctors"
        description="Get in touch with us to find more information about our services, or for any inquiries you may have."
        openGraph={{
          title: "Contact Us | Farsi-Speaking Doctors",
          description:
            "Get in touch with us to find more information about our services, or for any inquiries you may have.",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
          images: [
            {
              url: "/main.webp", // Use an appropriate image URL for the contact page
              width: 1200,
              height: 630,
              alt: "Contact Us Image",
            },
          ],
        }}
        robotsProps={{
          index: true, // Ensure the page is indexed
          follow: true, // Ensure links on the page are followed
        }}
      />

      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4, borderRadius: 2 }}>
          <Image
            src="/logo.png" // Replace with "/logo.webp" if pre-converted
            alt="Contact Us Image"
            width={isMobile ? 50 : 100}
            height={isMobile ? 50 : 100}
            quality={85}
            style={{
              width: isMobile ? 50 : 100,
              height: isMobile ? 50 : 100,
              borderRadius: "50%",
            }}
          />
          <Box textAlign="center" mb={3}>
            <Typography
              variant="h1"
              fontWeight={700}
              gutterBottom
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" }, // Smaller: 28px mobile, 40px desktop
              }}
            >
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
            >
              <Email color="success" />
              <Typography variant="body1">
                IranianDoctorsHub@gmail.com
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" gap={2} mb={3}>
            <IconButton
              href="https://www.instagram.com/i.dr.hub?igsh=eWo2eDBkaXhsNG1w&utm_source=qr"
              target="_blank"
              aria-labelledby="insta-btn"
            >
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
              label="Your Email"
              name="email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Subject"
              name="subject"
              fullWidth
              required
              value={formData.subject}
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

            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="success.main">{success}</Typography>}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                !formData.name ||
                !formData.email ||
                !formData.subject ||
                !formData.message
              }
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
