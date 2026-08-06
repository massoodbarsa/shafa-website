"use client";
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function DashboardCard({ title, icon, onClick }) {
  const { lang } = useLanguage();
  const isRtl = lang === "fa";

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 3,
        // Layout calculations split the flex row into 4 neat blocks on desktop viewports
        width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(25% - 18px)" },
        minHeight: "220px",
        cursor: onClick ? "pointer" : "default",

        // ─── VISUAL LOOK & FEEL MATCHING THE PHOTO ───
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Soft creamy white frosted panel opacity
        backdropFilter: "blur(12px)",
        borderRadius: "32px", // Distinct soft rounded canvas corners matching the design

        // Premium Double-Border Architecture: Gold outer rim, purple inset spacing vector
        border: "2px solid #E9C59A", // secondary.light gold outer rim line
        outline: "1px solid rgba(110, 80, 140, 0.15)", // Subtle primary purple inset accent lines
        outlineOffset: "-6px",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "space-between", // Pushes text center and structural gold elements base apart
        boxSizing: "border-box",
        position: "relative",
        transition: "all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)",

        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "#C99745", // Deep secondary gold border highlight on card hover states
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 12px 30px rgba(74, 28, 107, 0.15)",
        },
      }}
    >
      {/* Centered Graphic Symbol Frame */}
      <Box
        sx={{
          mt: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "primary.main", // Tied to your primary deep theme purple color scheme
        }}
      >
        {icon}
      </Box>

      {/* Card Content Heading Typography */}
      <Typography
        variant="h6"
        sx={{
          color: "#4A1C6B", // Exact primary.dark purple text tone matching your typography
          fontWeight: 600,
          fontSize: "1.1rem",
          lineHeight: 1.4,
          px: 1,
          fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "inherit",
          mb: 1,
        }}
      >
        {title}
      </Typography>

      {/* ─── BOTTOM DECORATIVE GOLD RULE WITH DIAMONDS (MATCHES PHOTO EXACTLY) ─── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "110px",
          mt: "auto",
          mb: 0.5,
        }}
      >
        {/* Left Horizontal Accent Fade */}
        <Box
          sx={{
            flex: 1,
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(201,151,69,0) 0%, #C99745 100%)",
            opacity: 0.6,
          }}
        />

        {/* Tiny Triple Center Diamond Cluster */}
        <Box sx={{ display: "flex", alignItems: "center", mx: 1, gap: 0.4 }}>
          <Box
            sx={{
              width: 4,
              height: 4,
              bgcolor: "#C99745",
              transform: "rotate(45deg)",
              opacity: 0.6,
            }}
          />
          <Box
            sx={{
              width: 6,
              height: 6,
              bgcolor: "#C99745",
              transform: "rotate(45deg)",
            }}
          />
          <Box
            sx={{
              width: 4,
              height: 4,
              bgcolor: "#C99745",
              transform: "rotate(45deg)",
              opacity: 0.6,
            }}
          />
        </Box>

        {/* Right Horizontal Accent Fade */}
        <Box
          sx={{
            flex: 1,
            height: "1px",
            background:
              "linear-gradient(270deg, rgba(201,151,69,0) 0%, #C99745 100%)",
            opacity: 0.6,
          }}
        />
      </Box>
    </Paper>
  );
}
