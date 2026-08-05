"use client";

import { Box, Typography, Button, Stack, Container } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";

export default function Home() {
  const { texts } = useLanguage();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Navbar />

      {/* ===== HERO SECTION ===== */}
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

          <Typography variant="h6" sx={{ mb: 5, opacity: 0.85 }}>
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

      {/* ===== WELCOME SECTION ===== */}
      <Box sx={{ py: 10, bgcolor: "#f8f5fc" }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            color="primary"
            fontWeight={700}
            gutterBottom
          >
            {texts.welcomeTitle}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.15rem",
              color: "text.secondary",
              maxWidth: 600,
              mx: "auto",
              mb: 4,
              lineHeight: 1.8,
            }}
          >
            {texts.welcomeText}
          </Typography>

          <Button variant="contained" size="large" color="primary">
            {texts.learnMore}
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
