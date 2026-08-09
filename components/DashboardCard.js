"use client";
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion"; // 1. Import the motion library utility

// 2. Create an animated version of MUI's Paper component
const MotionPaper = motion.create(Paper);

export default function DashboardCard({
  title,
  subtitle,
  icon,
  onClick,
  index,
}) {
  const { lang } = useLanguage();
  const isRtl = lang === "fa";

  // 3. Define the stagger reveal variants configuration
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Staggers card entrances smoothly one after another
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
      },
    }),
  };

  return (
    <MotionPaper
      elevation={0}
      onClick={onClick}
      custom={index} // Passes the array index down to handle the staggered delay calculation
      initial="hidden" // Initial starting state
      animate="visible" // Target state to trigger on mount
      variants={cardVariants} // Connects the layout states mapping matrix
      whileHover={{
        y: -6,
        borderColor: "#C99745",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 12px 30px rgba(74, 28, 107, 0.15)",
      }}
      className="motion-fix"
      sx={{
        p: { xs: 2.5, md: 3.5 },
        width: {
          xs: "calc(50% - 12px)",
          sm: "calc(50% - 12px)",
          md: "calc(33.33% - 18px)",
        },
        minHeight: "200px",
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
        <Typography
          variant="h6"
          sx={{
            color: "#4A1C6B",
            fontWeight: 600,
            fontSize: "1.1rem",
            lineHeight: 1.3,
            px: 0.5,
            fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "inherit",
            m: 0,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              color: "secondary.main",
              fontWeight: isRtl ? 400 : 300,
              fontStyle: isRtl ? "normal" : "italic",
              fontSize: { xs: "0.75rem", md: "0.85rem" },
              lineHeight: 1.2,
              fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "serif",
              mt: -0.5,
              px: 1,
            }}
          >
            {subtitle}
          </Typography>
        )}
        {/* Underline separator */}
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
    </MotionPaper>
  );
}
