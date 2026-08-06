"use client";
import React from "react";
import { Box, Button, Stack, Avatar, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";
import LanguageIcon from "@mui/icons-material/Language";
import PersianIcon from "../components/svg-icons/PersianIcon";

// Import your newly created universal wrapper component
import LayoutWrapper from "../components/LayoutWrapper";

export default function Home() {
  const { changeLanguage } = useLanguage();
  const router = useRouter();

  const handleSelectLanguage = (targetLang) => {
    changeLanguage(targetLang);
    router.push(`/${targetLang}/home`); // Redirects cleanly to /en/home or /fa/home
  };

  return (
    <LayoutWrapper>
      {/* ─── PROFILE CARD NODE ─── */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mb: 2,
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
            fontSize: { xs: "1.3rem", md: "1.8rem" },
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
            background: "rgba(84, 18, 131, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid",
            borderColor: "secondary.light",
            borderRadius: "16px",
            py: 2,
            px: 3,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            color: "#FFFFFF",
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "secondary.main",
              background: "rgba(110, 80, 140, 0.6)",
              boxShadow: "0px 4px 25px rgba(201, 151, 69, 0.2)",
            },
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              border: "1px solid",
              borderColor: "secondary.light",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersianIcon size={40} color="#C99745" />
          </Box>
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
        </Button>

        {/* English Button Trigger */}
        <Button
          onClick={() => handleSelectLanguage("en")}
          sx={{
            flex: 1,
            background: "rgba(84, 18, 131, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid",
            borderColor: "secondary.light",
            borderRadius: "16px",
            py: 2,
            px: 3,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            color: "#FFFFFF",
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "secondary.main",
              background: "rgba(110, 80, 140, 0.6)",
              boxShadow: "0px 4px 25px rgba(201, 151, 69, 0.2)",
            },
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              border: "1px solid",
              borderColor: "secondary.light",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LanguageIcon
              sx={{
                color: "secondary.main",
                fontSize: "2.3rem",
                opacity: 0.8,
              }}
            />
          </Box>

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
          </Box>
        </Button>
      </Stack>
    </LayoutWrapper>
  );
}
