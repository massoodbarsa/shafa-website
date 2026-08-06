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
        // ─── INCREASED INNER PADDING FOR A ROOMIER, PRETTIER FEEL ───
        p: { xs: 2.5, md: 4 },

        // ─── OPTIMIZED WIDE WIDTH CONFIGURATION FOR 4 AND 2 COLUMNS ───
        width: {
          xs: "calc(50% - 12px)", // Perfect wide distribution for 2 columns on mobile
          sm: "calc(50% - 12px)", // Perfect wide distribution for 2 columns on tablet
          md: "calc(25% - 20px)", // Perfect wide distribution for 4 columns on desktop
        },
        minHeight: "190px", // Slightly boosted height to stay proportional to the new wider design
        cursor: onClick ? "pointer" : "default",

        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
        borderRadius: "32px", // Smooth rounded frame matching the design

        // Premium Double-Border Setup
        border: "2px solid #E9C59A",
        outline: "1px solid rgba(110, 80, 140, 0.15)",
        outlineOffset: "-8px", // Pushed deeper inward to frame the wider canvas beautifully

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
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
      {/* Unified Text & Symbol Alignment Block */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: 1.5, // Expanded layout gap space between icon and text title
          mt: 0.5,
        }}
      >
        {/* Centered Graphic Icon Frame */}
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

        {/* Card Content Title */}
        <Typography
          variant="h6"
          sx={{
            color: "#4A1C6B",
            fontWeight: 600,
            fontSize: { xs: "0.95rem", md: "1.15rem" }, // Boosted text sizes slightly to fit the wider cards
            lineHeight: 1.4,
            px: 1, // Sideways padding padding stops letters from hitting lines
            fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "inherit",
            m: 0,
          }}
        >
          {title}
        </Typography>

        {/* ─── EXPANDED GOLD DIAMOND UNDERLINE SEPARATOR ─── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "115px", // Widened line length to balance the prettier horizontal layout
            mt: 0.5,
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(201,151,69,0) 0%, #C99745 100%)",
              opacity: 0.6,
            }}
          />
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
