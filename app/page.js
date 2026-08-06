"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  Avatar,
} from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";
import SpaIcon from "@mui/icons-material/Spa";
import LanguageIcon from "@mui/icons-material/Language";

export default function Home() {
  const { changeLanguage } = useLanguage();
  const router = useRouter();

  const handleSelectLanguage = (targetLang) => {
    changeLanguage(targetLang);
    router.push("/home");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        overflowY: "auto",
        backgroundColor: "background.default",

        backgroundImage: 'url("/landing-bg.jpeg")',
        backgroundSize: {
          xs: "cover",
          sm: "100% 100%",
        },
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#FFFFFF",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        py: { xs: 4, md: 6 },
        px: 2,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 2.5, md: 4 },
          my: "auto",
        }}
      >
        {/* ─── BRANDING HEADER GROUP (MATCHES PHOTO) ─── */}
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 400,
              letterSpacing: "0.25em",
              color: "#FFFFFF",
              fontSize: { xs: "3rem", md: "4.5rem" },
              fontFamily: "serif",
              mb: 0.5,
              textShadow: "0px 4px 15px rgba(29, 19, 55, 0.6)",
            }}
          >
            SHAFA
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 400,
              letterSpacing: "0.15em",
              color: "#4A1C6B", // Using your dark theme primary purple for the photo look
              fontSize: { xs: "0.9rem", md: "1.6rem" },
              fontFamily: "serif",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            HYPNOTHERAPY & WELLNESS
          </Typography>
        </Box>

        {/* ─── GOLD THIN LINE DIVIDER WITH LOTUS (MATCHES PHOTO) ─── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "450px",
            mb: 1,
          }}
        >
          {/* Left Decorative Line Accent */}
          <Box
            sx={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(201,151,69,0) 0%, rgba(201,151,69,0.6) 100%)",
            }}
          />

          {/* Central Lotus Accent */}
          <SpaIcon
            sx={{
              color: "secondary.main",
              mx: 2,
              fontSize: "1.6rem",
              transform: "scaleY(0.9)",
            }}
          />

          {/* Right Decorative Line Accent */}
          <Box
            sx={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(270deg, rgba(201,151,69,0) 0%, rgba(201,151,69,0.6) 100%)",
            }}
          />
        </Box>

        {/* ─── PROFILE CARD NODE ─── */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar
            src="/shabnam-avatar.jpg"
            sx={{
              width: { xs: 100, md: 120 },
              height: { xs: 100, md: 120 },
              border: "2px solid",
              borderColor: "secondary.main",
              boxShadow: "0px 8px 24px rgba(18, 11, 36, 0.4)",
              mb: 2,
              backgroundColor: "background.paper",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Noto Naskh Arabic", serif',
              color: "secondary.main",
              fontWeight: 400,
              fontSize: { xs: "1.3rem", md: "1.7rem" },
              lineHeight: 1.2,
            }}
          >
            شبنم امیری
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "secondary.main",
              fontWeight: 300,
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              letterSpacing: "0.05em",
              mt: 0.5,
            }}
          >
            Shabnam Amiri
          </Typography>
        </Box>

        {/* ─── DUAL LANGUAGE GATEWAY SELECTION BUTTONS ─── */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2.5}
          sx={{ width: "100%", mt: 1, direction: "ltr" }}
        >
          {/* Persian Button Trigger */}
          <Button
            onClick={() => handleSelectLanguage("fa")}
            sx={{
              flex: 1,
              background: "rgba(84, 18, 131, 0.45)",
              backdropFilter: "blur(12px)",
              border: "1px solid",
              borderColor: "secondary.light",
              borderRadius: "16px",
              py: 2,
              px: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#FFFFFF",
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "secondary.main",
                background: "rgba(110, 80, 140, 0.3)",
                boxShadow: "0px 4px 25px rgba(201, 151, 69, 0.2)",
              },
            }}
          >
            <Box sx={{ textAlign: "left" }}>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  fontFamily: '"Noto Naskh Arabic", serif',
                }}
              >
                فارسی
              </Typography>
              <Typography
                sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}
              >
                Persian
              </Typography>
            </Box>
            <Box
              sx={{
                width: 32,
                height: 32,
                border: "1px solid",
                borderColor: "secondary.light",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SpaIcon sx={{ color: "secondary.main", fontSize: "1.1rem" }} />
            </Box>
          </Button>

          {/* English Button Trigger */}
          <Button
            onClick={() => handleSelectLanguage("en")}
            sx={{
              flex: 1,
              background: "rgba(84, 18, 131, 0.45)",
              backdropFilter: "blur(12px)",
              border: "1px solid",
              borderColor: "secondary.light",
              borderRadius: "16px",
              py: 2,
              px: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#FFFFFF",
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "secondary.main",
                background: "rgba(110, 80, 140, 0.3)",
                boxShadow: "0px 4px 25px rgba(201, 151, 69, 0.2)",
              },
            }}
          >
            <Box sx={{ textAlign: "left" }}>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  fontFamily: "serif",
                }}
              >
                English
              </Typography>
              <Typography
                sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}
              >
                English
              </Typography>
            </Box>
            <LanguageIcon
              sx={{ color: "secondary.main", fontSize: "1.6rem", opacity: 0.8 }}
            />
          </Button>
        </Stack>

        {/* ─── FIXED IMMUTABLE BOTTOM MOTTO BLOCK ─── */}
        <Box sx={{ textAlign: "center", mt: { xs: 2, md: 4 } }}>
          <Typography
            variant="h4"
            sx={{
              fontStyle: "italic",
              fontWeight: 300,
              letterSpacing: "0.05em",
              color: "rgba(255,255,255,0.95)",
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontFamily: "serif",
              mb: 1,
              textShadow: "0px 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            Healing begins within.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Noto Naskh Arabic", serif',
              color: "#FFFFFF",
              fontWeight: 300,
              fontSize: { xs: "1.25rem", md: "1.45rem" },
              textShadow: "0px 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            شفا از درون آغاز می‌شود.
          </Typography>

          {/* Decorative Bottom Rule */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2.5 }}>
            <Box
              sx={{
                width: 35,
                height: "1px",
                bgcolor: "rgba(201,151,105,0.35)",
                alignSelf: "center",
              }}
            />
            <SpaIcon
              sx={{
                color: "secondary.main",
                fontSize: "0.9rem",
                mx: 1.5,
                transform: "scale(0.85)",
              }}
            />
            <Box
              sx={{
                width: 35,
                height: "1px",
                bgcolor: "rgba(201,151,105,0.35)",
                alignSelf: "center",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
