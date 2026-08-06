"use client";
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

// Swapped to standard stable cross-version icon imports from Material UI
import HelpIcon from "@mui/icons-material/Help";
import PersonIcon from "@mui/icons-material/Person";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import HealingIcon from "@mui/icons-material/Healing";
import SchoolIcon from "@mui/icons-material/School";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function DashboardGrid() {
  const { texts, lang } = useLanguage();

  // Mapping the fixed icons array line-by-line to your 8 text matrix array slots
  const icons = [
    <HelpIcon sx={{ fontSize: "2.2rem", color: "primary.dark" }} />,
    <PersonIcon sx={{ fontSize: "2.2rem", color: "primary.dark" }} />,
    <WorkspacePremiumIcon sx={{ fontSize: "2.2rem", color: "primary.dark" }} />,
    <SelfImprovementIcon sx={{ fontSize: "2.2rem", color: "primary.dark" }} />,
    <ChildCareIcon sx={{ fontSize: "2.2rem", color: "primary.dark" }} />,
    <HealingIcon sx={{ fontSize: "2.2rem", color: "primary.dark" }} />,
    <SchoolIcon sx={{ fontSize: "2.2rem", color: "primary.dark" }} />,
    <AutoAwesomeIcon sx={{ fontSize: "2.2rem", color: "primary.dark" }} />,
  ];

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      {/* ─── DYNAMIC SALUTATION HEADER BLOCK ─── */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 400,
            fontFamily: lang === "fa" ? '"Noto Naskh Arabic", serif' : "serif",
            color: "#FFFFFF",
            mb: 1.5,
            fontSize: { xs: "1.6rem", md: "2.4rem" },
          }}
        >
          {texts.homeDashboard.greeting}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "secondary.light",
            fontWeight: 300,
            fontSize: { xs: "0.85rem", md: "1.05rem" },
            fontFamily:
              lang === "fa" ? '"Noto Naskh Arabic", sans-serif' : "inherit",
          }}
        >
          {texts.homeDashboard.subGreeting}
        </Typography>
      </Box>

      {/* ─── MODERN 8-CARD FLEX GRID STRUCTURE ─── */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          direction: lang === "fa" ? "rtl" : "ltr",
        }}
      >
        {texts.homeDashboard.cards.map((card, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 3,
              width: {
                xs: "100%",
                sm: "calc(50% - 12px)",
                md: "calc(25% - 18px)",
              },
              height: "170px",
              backgroundColor: "rgba(255, 255, 255, 0.88)",
              backdropFilter: "blur(12px)",
              border: "2px solid",
              borderColor: "secondary.light",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
              "&:hover": {
                transform: "translateY(-5px)",
                borderColor: "secondary.main",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 10px 25px rgba(74, 28, 107, 0.25)",
              },
            }}
          >
            {/* Round Avatar Icon Shield Frame */}
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                bgcolor: "rgba(110, 80, 140, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1.5,
              }}
            >
              {icons[index]}
            </Box>

            {/* Card Content Title String */}
            <Typography
              variant="h6"
              sx={{
                color: "primary.dark",
                fontWeight: 600,
                fontSize: "1rem",
                lineHeight: 1.3,
                fontFamily:
                  lang === "fa" ? '"Noto Naskh Arabic", sans-serif' : "inherit",
              }}
            >
              {card.title}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
