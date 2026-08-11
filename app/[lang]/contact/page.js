"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SendIcon from "@mui/icons-material/Send";
import LayoutWrapper from "@/components/LayoutWrapper";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

export default function ContactPage() {
  const { texts, lang } = useLanguage();
  const isRtl = lang === "fa";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Error");

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] },
    },
  };

  return (
    <Box dir={isRtl ? "rtl" : "ltr"} sx={{ width: "100%" }}>
      <LayoutWrapper>
        <Container
          maxWidth="xl"
          component={MotionBox}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 4, md: 5 },
            px: { xs: 2, md: 3 },
            py: 4,
          }}
        >
          {/* Header */}
          <Box
            sx={{ textAlign: "center", maxWidth: 700 }}
            component={motion.div}
            variants={itemVariants}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "serif",
                fontWeight: 400,
                letterSpacing: isRtl ? "0" : "0.12em",
                color: "#4A1C6B",
                fontSize: { xs: "1.8rem", md: "2.4rem" },
                mb: 1.5,
              }}
            >
              {texts.contactPage.title}
            </Typography>

            <Typography
              sx={{
                fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "serif",
                fontWeight: 300,
                color: "rgba(74, 28, 107, 0.85)",
                fontSize: { xs: "1rem", md: "1.15rem" },
                lineHeight: 1.7,
              }}
            >
              {texts.contactPage.subtitle}
            </Typography>
          </Box>

          {/* Form and Info Layout */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 4, md: 6 },
              alignItems: "flex-start",
            }}
          >
            {/* Info Cards Side Panel */}
            <Stack
              spacing={3}
              component={MotionBox}
              variants={itemVariants}
              sx={{
                flex: { md: "0 0 340px" },
                width: { xs: "100%", md: "auto" },
              }}
            >
              <MotionPaper
                elevation={0}
                whileHover={{ y: -4, borderColor: "#C99745" }}
                sx={{
                  p: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "24px",
                  border: "2px solid #E9C59A",
                  outline: "1px solid rgba(110, 80, 140, 0.1)",
                  outlineOffset: "-6px",
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
                  <LocationOnOutlinedIcon
                    sx={{ color: "#C99745", fontSize: "1.4rem" }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#4A1C6B",
                      fontFamily: isRtl
                        ? '"Noto Naskh Arabic", sans-serif'
                        : "inherit",
                    }}
                  >
                    {texts.contactPage.studio}
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    color: "#4A1C6B",
                    fontWeight: 300,
                    pl: isRtl ? 0 : 4,
                    pr: isRtl ? 4 : 0,
                  }}
                >
                  {texts.footer.address}
                </Typography>
              </MotionPaper>

              <MotionPaper
                elevation={0}
                whileHover={{ y: -4, borderColor: "#C99745" }}
                sx={{
                  p: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "24px",
                  border: "2px solid #E9C59A",
                  outline: "1px solid rgba(110, 80, 140, 0.1)",
                  outlineOffset: "-6px",
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
                  <PhoneOutlinedIcon
                    sx={{ color: "#C99745", fontSize: "1.4rem" }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#4A1C6B",
                      fontFamily: isRtl
                        ? '"Noto Naskh Arabic", sans-serif'
                        : "inherit",
                    }}
                  >
                    {texts.contactPage.phone}
                  </Typography>
                </Stack>
                <Typography
                  dir="ltr"
                  sx={{
                    color: "#4A1C6B",
                    fontWeight: 300,
                    textAlign: isRtl ? "right" : "left",
                    pl: isRtl ? 0 : 4,
                    pr: isRtl ? 4 : 0,
                  }}
                >
                  {texts.footer.phone}
                </Typography>
              </MotionPaper>

              <MotionPaper
                elevation={0}
                whileHover={{ y: -4, borderColor: "#C99745" }}
                sx={{
                  p: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "24px",
                  border: "2px solid #E9C59A",
                  outline: "1px solid rgba(110, 80, 140, 0.1)",
                  outlineOffset: "-6px",
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
                  <EmailOutlinedIcon
                    sx={{ color: "#C99745", fontSize: "1.4rem" }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#4A1C6B",
                      fontFamily: isRtl
                        ? '"Noto Naskh Arabic", sans-serif'
                        : "inherit",
                    }}
                  >
                    {texts.contactPage.email}
                  </Typography>
                </Stack>
                <Typography
                  dir="ltr"
                  sx={{
                    color: "#4A1C6B",
                    fontWeight: 300,
                    textAlign: isRtl ? "right" : "left",
                    pl: isRtl ? 0 : 4,
                    pr: isRtl ? 4 : 0,
                  }}
                >
                  {texts.footer.email}
                </Typography>
              </MotionPaper>
            </Stack>
            {/* Interactive Input Form Panel */}
            <MotionPaper
              elevation={0}
              variants={itemVariants}
              sx={{
                flex: 1,
                width: "100%",
                p: { xs: 3, md: 4 },
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(12px)",
                borderRadius: "32px",
                border: "2px solid #E9C59A",
                outline: "1px solid rgba(110, 80, 140, 0.15)",
                outlineOffset: "-8px",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    label={texts.contactPage.labelName}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    slotProps={{
                      inputLabel: {
                        style: {
                          right: isRtl ? 24 : "auto",
                          transformOrigin: isRtl ? "top right" : "top left",
                        },
                      },
                    }}
                  />
                  <TextField
                    label={texts.contactPage.labelEmail}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    slotProps={{
                      inputLabel: {
                        style: {
                          right: isRtl ? 24 : "auto",
                          transformOrigin: isRtl ? "top right" : "top left",
                        },
                      },
                    }}
                  />
                  <TextField
                    label={texts.contactPage.labelPhone}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    slotProps={{
                      inputLabel: {
                        style: {
                          right: isRtl ? 24 : "auto",
                          transformOrigin: isRtl ? "top right" : "top left",
                        },
                      },
                    }}
                  />
                  <TextField
                    label={texts.contactPage.labelSubject}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    fullWidth
                    required
                    slotProps={{
                      inputLabel: {
                        style: {
                          right: isRtl ? 24 : "auto",
                          transformOrigin: isRtl ? "top right" : "top left",
                        },
                      },
                    }}
                  />
                  <TextField
                    label={texts.contactPage.labelMessage}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    required
                    slotProps={{
                      inputLabel: {
                        style: {
                          right: isRtl ? 24 : "auto",
                          transformOrigin: isRtl ? "top right" : "top left",
                        },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    endIcon={
                      <SendIcon
                        sx={{ transform: isRtl ? "rotate(180deg)" : "none" }}
                      />
                    }
                    sx={{
                      alignSelf: isRtl ? "flex-start" : "flex-start",
                      px: 5,
                      py: 1.5,
                      borderRadius: "16px",
                      backgroundColor: "#4A1C6B",
                      fontFamily: isRtl
                        ? '"Noto Naskh Arabic", sans-serif'
                        : "inherit",
                      "&:hover": { backgroundColor: "#6E508C" },
                    }}
                  >
                    {loading
                      ? texts.contactPage.btnSending
                      : texts.contactPage.btnSend}
                  </Button>
                </Stack>
              </form>
            </MotionPaper>
          </Box>
        </Container>
      </LayoutWrapper>
    </Box>
  );
}
