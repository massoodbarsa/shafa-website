"use client";
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function DashboardCard({ title, subtitle, icon, onClick }) {
  const { lang } = useLanguage();
  const isRtl = lang === "fa";

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: { xs: 2.5, md: 3.5 },
        width: {
          xs: "calc(50% - 12px)", // FIXED: Forces exactly 2 columns across on mobile viewports
          sm: "calc(50% - 12px)", // Keeps 2 columns across on small tablet viewports
          md: "calc(33.33% - 18px)", // FIXED: Forces exactly 3 columns across on desktop viewports (3x3 grid)
        },
        minHeight: "200px", // Balanced height to handle cards with or without subtitles gracefully
        cursor: onClick ? "pointer" : "default",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
        borderRadius: "32px",
        border: "2px solid #E9C59A",
        outline: "1px solid rgba(110, 80, 140, 0.15)",
        outlineOffset: "-8px",
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: 1.2,
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
            fontSize: { xs: "0.95rem", md: "1.1rem" },
            lineHeight: 1.3,
            px: 0.5,
            fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "inherit",
            m: 0,
          }}
        >
          {title}
        </Typography>

        {/* ─── DYNAMIC SUBTITLE ENGINE (SMALLER AND CLEANER) ─── */}
        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              color: "primary.main", // Tied to your gold theme vector accent
              fontWeight: isRtl ? 400 : 300,
              fontStyle: isRtl ? "normal" : "italic", // Beautiful elegant slant for English text
              fontSize: { xs: "0.75rem", md: "0.85rem" },
              lineHeight: 1.2,
              fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "serif",
              mt: -0.5, // Tucks it right tightly underneath the primary title
              px: 1,
            }}
          >
            ( {subtitle})
          </Typography>
        )}

        {/* Thin Gold Star/Diamond Indicator Rule Below Text */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "100px",
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
          <Box
            sx={{ display: "flex", alignItems: "center", mx: 0.8, gap: 0.3 }}
          >
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
