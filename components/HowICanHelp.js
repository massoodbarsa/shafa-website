"use client";
import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

import SpaIcon from "@mui/icons-material/Spa";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ContactMailIcon from "@mui/icons-material/ContactMail";

export default function HowICanHelp() {
  const { texts, lang } = useLanguage();

  const helpItems = [
    {
      title: texts.howItems.whatIs,
      desc: texts.howItems.whatIsDesc,
      icon: <SpaIcon sx={{ color: "#C5A880", fontSize: "2rem" }} />,
    },
    {
      title: texts.howItems.services,
      desc: texts.howItems.servicesDesc,
      icon: <SelfImprovementIcon sx={{ color: "#C5A880", fontSize: "2rem" }} />,
    },
    {
      title: texts.howItems.innerChild,
      desc: texts.howItems.innerChildDesc,
      icon: <ChildCareIcon sx={{ color: "#C5A880", fontSize: "2rem" }} />,
    },
    {
      title: texts.howItems.meditations,
      desc: texts.howItems.meditationsDesc,
      icon: <AutoAwesomeIcon sx={{ color: "#C5A880", fontSize: "2rem" }} />,
    },
    {
      title: texts.howItems.workshops,
      desc: texts.howItems.workshopsDesc,
      icon: <SchoolIcon sx={{ color: "#C5A880", fontSize: "2rem" }} />,
    },
    {
      title: texts.howItems.booking,
      desc: texts.howItems.bookingDesc,
      icon: <CalendarMonthIcon sx={{ color: "#C5A880", fontSize: "2rem" }} />,
    },
    {
      title: texts.howItems.certificates,
      desc: texts.howItems.certificatesDesc,
      icon: (
        <WorkspacePremiumIcon sx={{ color: "#C5A880", fontSize: "2rem" }} />
      ),
    },
    {
      title: texts.howItems.contact,
      desc: texts.howItems.contactDesc,
      icon: <ContactMailIcon sx={{ color: "#C5A880", fontSize: "2rem" }} />,
    },
  ];

  return (
    <Box sx={{ py: 5, bgcolor: "white" }}>
      <Container maxWidth="xl">
        {/* Shifted to xl container layout to give more horizontal breath space for long sentences */}
        <Typography
          variant="h4"
          color="primary"
          fontWeight={700}
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          {texts.howTitle}
        </Typography>
        {/* CSS Flexbox Flex Wrapper container box handles strict width rows without spacing drop overlaps */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            direction: lang === "fa" ? "rtl" : "ltr",
          }}
        >
          {helpItems.map((item, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 3,
                // Layout Math Calculations:
                // Desktop: Exactly 25% width minus the flex gap adjustment ensures exactly 4 structural elements sit on one horizontal row line.
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(25% - 18px)",
                },
                // Strict Uniform Vertical Sizing Blueprint locks height properties regardless of localized string lengths
                minHeight: "260px",
                textAlign: "center",
                border: "1px solid #e8d5f2",
                borderRadius: 3,
                transition: "0.3s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                boxSizing: "border-box",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(107,45,139,0.15)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
                {item.icon}
              </Box>

              <Typography
                variant="h6"
                color="primary"
                fontWeight={600}
                gutterBottom
                sx={{
                  minHeight: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }} // Stabilises title spacing
              >
                {item.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.6,
                  // Uses standard css text-clamping rules if a description overflows excessively
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.desc}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
