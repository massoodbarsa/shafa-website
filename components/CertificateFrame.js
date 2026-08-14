"use client";

import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

const MotionPaper = motion.create(Paper);

export default function CertificateFrame({
  title,
  description,
  imageSrc,
  imageAlt,
  isRtl = false,
}) {
  return (
    <MotionPaper
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      elevation={0}
      sx={{
        height: "100%",
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: 3,
        border: "1px solid rgba(88, 62, 147, 0.12)",
        overflow: "hidden",
        transition: "all 0.25s ease",
        "&:hover": {
          boxShadow: "0 12px 40px rgba(88, 62, 147, 0.10)",
          transform: "translateY(-4px)",
        },
      }}
    >
      {/* Image frame */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "4/3",
          bgcolor: "#f5f3f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          borderBottom: "1px solid rgba(88, 62, 147, 0.08)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: 1,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            // Optional fallback placeholder:
            // onError={(e) => { e.currentTarget.src = "/images/placeholder-cert.jpg"; }}
          />
        </Box>
      </Box>

      {/* Text content */}
      <Box sx={{ p: { xs: 3, md: 4 } }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
            fontSize: { xs: "1.15rem", md: "1.3rem" },
            mb: 1,
            textAlign: isRtl ? "right" : "left",
            fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "inherit",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontSize: { xs: "0.98rem", md: "1.08rem" },
            lineHeight: { xs: 1.7, md: 1.9 },
            textAlign: isRtl ? "justify" : "left",
            fontFamily: isRtl
              ? '"Noto Naskh Arabic", sans-serif'
              : "Georgia, serif",
            opacity: 0.85,
          }}
        >
          {description}
        </Typography>
      </Box>
    </MotionPaper>
  );
}
