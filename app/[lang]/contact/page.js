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
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SendIcon from "@mui/icons-material/Send";
import LayoutWrapper from "@/components/LayoutWrapper";
import { motion } from "framer-motion";

import enTranslations from "../../../messages/en.json";
import faTranslations from "../../../messages/fa.json";
import { useLanguage } from "@/context/LanguageContext";

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

export default function ContactPage() {
  const { lang } = useLanguage();
  const isRtl = lang === "fa";
  const t = isRtl ? faTranslations : enTranslations;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setNotification((prev) => ({ ...prev, open: false }));
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

      setNotification({
        open: true,
        message: isRtl
          ? "پیام شما با موفقیت ارسال شد. سپاسگزاریم!"
          : "Your message has been sent successfully. Thank you!",
        severity: "success",
      });

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setNotification({
        open: true,
        message: isRtl
          ? "متأسفانه مشکلی در سرور یا ارسال پیام پیش آمده است. دوباره تلاش کنید."
          : "Server error occurred. Something went wrong. Please try again later.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] },
    },
  };

  const glassCardStyles = {
    p: { xs: 2.5, md: 3.5 },
    backgroundColor: "rgba(29, 19, 55, 0.75)",

    backdropFilter: "blur(16px)",
    borderRadius: "24px",
    borderTop: "3px solid #E9C59A",
    borderLeft: "1px solid rgba(233, 197, 154, 0.08)",
    borderRight: "1px solid rgba(233, 197, 154, 0.08)",
    borderBottom: "1px solid rgba(233, 197, 154, 0.05)",
    boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.25)",
    transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      color: "text.secondary",
      "& fieldset": { borderColor: "rgba(233, 197, 154, 0.3)" },
      "&:hover fieldset": { borderColor: "secondary.light" },
      "&.Mui-focused fieldset": { borderColor: "secondary.main" },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 0.6)",
      "&.Mui-focused": { color: "secondary.main" },
    },
  };

  return (
    <Box
      dir={isRtl ? "rtl" : "ltr"}
      sx={{ width: "100%", bgcolor: "background.default", minHeight: "100vh" }}
    >
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
            py: 6,
          }}
        >
          {/* Header Typography Elements */}
          <Box
            sx={{ textAlign: "center", maxWidth: 700 }}
            component={motion.div}
            variants={itemVariants}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 400,
                letterSpacing: isRtl ? "0" : "0.15em",
                color: "text.primary",
                fontSize: { xs: "2rem", md: "2.6rem" },
                mb: 2,
                textShadow: "0px 4px 12px rgba(0,0,0,0.5)",
              }}
            >
              {t.contactPage.title}
            </Typography>

            <Typography
              sx={{
                fontWeight: 300,
                color: "rgba(255, 255, 255, 0.75)",
                fontSize: { xs: "1rem", md: "1.15rem" },
                lineHeight: 1.75,
              }}
            >
              {t.contactPage.subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 4, md: 5 },
              alignItems: "flex-start",
            }}
          >
            {/* Info Cards Column Layout Panel */}
            <Stack
              spacing={3}
              component={MotionBox}
              variants={itemVariants}
              sx={{
                flex: { md: "0 0 340px" },
                width: { xs: "100%", md: "auto" },
              }}
            >
              {/* Studio Info Card */}
              <MotionPaper
                elevation={0}
                whileHover={{
                  scale: 1.02,
                  borderTopColor: "#C99745",
                  boxShadow: "0px 20px 45px rgba(0, 0, 0, 0.45)",
                }}
                sx={glassCardStyles}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  mb={1.5}
                >
                  <LocationOnOutlinedIcon
                    sx={{ color: "secondary.main", fontSize: "1.5rem" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      color: "secondary.light",
                      fontSize: "1.05rem",
                    }}
                  >
                    {t.contactPage.labelPlace}
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontWeight: 300,
                    pl: isRtl ? 0 : 4,
                    pr: isRtl ? 4 : 0,
                    lineHeight: 1.6,
                  }}
                >
                  {t.footer.address}
                </Typography>
              </MotionPaper>

              {/* Phone Info Card */}
              <MotionPaper
                elevation={0}
                whileHover={{
                  scale: 1.02,
                  borderTopColor: "#C99745",
                  boxShadow: "0px 20px 45px rgba(0, 0, 0, 0.45)",
                }}
                sx={glassCardStyles}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  mb={1.5}
                >
                  <PhoneOutlinedIcon
                    sx={{ color: "secondary.main", fontSize: "1.5rem" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      color: "secondary.light",
                      fontSize: "1.05rem",
                    }}
                  >
                    {t.contactPage.labelPhone}
                  </Typography>
                </Stack>
                <Typography
                  dir="ltr"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 300,
                    textAlign: isRtl ? "right" : "left",
                    pl: isRtl ? 0 : 4,
                    pr: isRtl ? 4 : 0,
                  }}
                >
                  {t.footer.phone}
                </Typography>
              </MotionPaper>

              {/* Email Info Card */}
              <MotionPaper
                elevation={0}
                whileHover={{
                  scale: 1.02,
                  borderTopColor: "#C99745",
                  boxShadow: "0px 20px 45px rgba(0, 0, 0, 0.45)",
                }}
                sx={glassCardStyles}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  mb={1.5}
                >
                  <EmailOutlinedIcon
                    sx={{ color: "secondary.main", fontSize: "1.5rem" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      color: "secondary.light",
                      fontSize: "1.05rem",
                    }}
                  >
                    {t.contactPage.labelEmail}
                  </Typography>
                </Stack>
                <Typography
                  dir="ltr"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 300,
                    textAlign: isRtl ? "right" : "left",
                    pl: isRtl ? 0 : 4,
                    pr: isRtl ? 4 : 0,
                  }}
                >
                  {t.footer.email}
                </Typography>
              </MotionPaper>
            </Stack>
            {/* Dark Interactive Submission Input Panel */}
            <MotionPaper
              elevation={0}
              variants={itemVariants}
              sx={{
                flex: 1,
                width: "100%",
                p: { xs: 3, md: 5 },
                backgroundColor: "background.paper",
                borderRadius: "32px",
                border: "1px solid rgba(233, 197, 154, 0.25)",
                outline: "1px solid rgba(157, 107, 217, 0.15)",
                outlineOffset: "-8px",
                boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.4)",
              }}
            >
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Stack spacing={3.5}>
                  <TextField
                    color="text.secondary"
                    label={t.contactPage.labelName}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={inputStyles}
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
                    label={t.contactPage.labelEmail}
                    color="text.secondary"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={inputStyles}
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
                    label={t.contactPage.labelPhone}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    sx={inputStyles}
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
                    label={t.contactPage.labelSubject}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={inputStyles}
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
                    label={t.contactPage.labelMessage}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    required
                    sx={inputStyles}
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
                      loading ? (
                        <CircularProgress
                          size={18}
                          sx={{ color: "rgba(255,255,255,0.7)" }}
                        />
                      ) : (
                        <SendIcon
                          sx={{ transform: isRtl ? "rotate(180deg)" : "none" }}
                        />
                      )
                    }
                    sx={{
                      alignSelf: "flex-start",
                      px: 6,
                      py: 1.8,
                      borderRadius: "14px",
                      backgroundColor: "primary.main",
                      color: "#FFFFFF",
                      fontWeight: 600,
                      gap: 1.5,
                      boxShadow: "0px 4px 20px rgba(157, 107, 217, 0.3)",
                      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                      "&.Mui-disabled": {
                        backgroundColor: "primary.main", // or your brand color
                        color: "#fff", // white text
                        opacity: 0.8,
                      },
                      "&:hover": {
                        backgroundColor: "primary.light",
                        transform: "translateY(-2px)",
                        boxShadow: "0px 6px 25px rgba(157, 107, 217, 0.55)",
                      },
                    }}
                  >
                    {loading ? t.contactPage.btnSending : t.contactPage.btnSend}
                  </Button>
                </Stack>
              </form>
            </MotionPaper>
          </Box>
        </Container>
      </LayoutWrapper>

      {/* Floating Status Popup Snackbar Alerts hoisted outside to protect context state */}
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: isRtl ? "left" : "right",
        }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: "12px",
            backgroundColor:
              notification.severity === "success"
                ? "secondary.main"
                : "#36306F",
            color: "#FFFFFF",
            fontWeight: 500,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
            fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "inherit",
            direction: isRtl ? "rtl" : "ltr",
            "& .MuiAlert-icon": {
              marginLeft: isRtl ? 1.5 : 0,
              marginRight: isRtl ? 0 : 1.5,
            },
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
