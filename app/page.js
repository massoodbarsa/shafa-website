"use client";

import { Box, Typography, Button, Stack, Container } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";

export default function Home() {
  const { texts, lang, changeLanguage } = useLanguage();

  return (
    <Box sx={{ p: 4, textAlign: "center", minHeight: "100vh" }}>
      <Navbar />
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "linear-gradient(180deg, #2d1b4e 0%, #1a0b2e 100%)",
          color: "white",
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: 2,
              mb: 1,
              fontSize: { xs: "2.5rem", md: "3.8rem" },
            }}
          >
            {texts.title}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              letterSpacing: 3,
              mb: 3,
              opacity: 0.9,
              fontSize: { xs: "1rem", md: "1.3rem" },
            }}
          >
            {texts.subtitle}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 5,
              opacity: 0.85,
              fontWeight: 400,
            }}
          >
            {texts.tagline}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "white",
                color: "primary.main",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                "&:hover": { bgcolor: "#f0e6f7" },
              }}
            >
              {texts.bookSession}
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "white",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {texts.exploreServices}
            </Button>
          </Stack>
        </Container>
      </Box>
      {/* Language Switcher - always stays on the right */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 4,
          direction: "ltr", // force left-to-right
        }}
      >
        <Stack direction="row" spacing={1}>
          <Button
            variant={lang === "en" ? "contained" : "outlined"}
            size="small"
            onClick={() => changeLanguage("en")}
          >
            English
          </Button>
          <Button
            variant={lang === "fa" ? "contained" : "outlined"}
            size="small"
            onClick={() => changeLanguage("fa")}
          >
            فارسی
          </Button>
        </Stack>
      </Box>

      {/* Main Content */}
      <Typography variant="h2" color="primary" gutterBottom fontWeight={700}>
        {texts.title}
      </Typography>

      <Typography variant="h5" color="text.secondary" gutterBottom>
        {texts.subtitle}
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, mt: 2 }}>
        {texts.tagline}
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" size="large">
          {texts.bookSession}
        </Button>
        <Button variant="outlined" size="large">
          {texts.exploreServices}
        </Button>
      </Stack>
    </Box>
  );
}
