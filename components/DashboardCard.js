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
        // Responsive width layout system targets 3 columns across on desktop windows
        width: {
          xs: "100%",
          sm: "calc(50% - 12px)",
          md: "calc(33.33% - 16px)",
        },
        minHeight: "220px",
        cursor: onClick ? "pointer" : "default",

        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
        borderRadius: "32px",

        border: "2px solid #E9C59A",
        outline: "1px solid rgba(110, 80, 140, 0.15)",
        outlineOffset: "-6px",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center", // Perfectly centers the unified content stack vertically
        boxSizing: "border-box",
        position: "relative",
        transition: "all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)",

        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "#C99745",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 12px 30px rgba(74, 28, 107, 0.15)",
        },
      }}
    >
      {/* ─── UNIFIED BLOCK WRAPPER ─── */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: 1.5, // Tight spacing between icon, text header, and lines
          mt: 0.5,
        }}
      >
        {/* Centered Graphic Symbol Frame */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.main",
          }}
        >
          {icon}
        </Box>

        {/* Card Content Heading Typography */}
        <Typography
          variant="h6"
          sx={{
            color: "#4A1C6B",
            fontWeight: 600,
            fontSize: "1.1rem",
            lineHeight: 1.3,
            px: 1,
            fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "inherit",
            m: 0,
          }}
        >
          {title}
        </Typography>

        {/* ─── FIXED POSITION: GOLD RULE WITH DIAMONDS RIGHT BELOW TEXT ─── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "110px",
            mt: 0.2, // Tiny space directly underneath your text line
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
      </Box>
    </Paper>
  );
}
