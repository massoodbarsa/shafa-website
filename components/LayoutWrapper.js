"use client";
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";

export default function LayoutWrapper({ children }) {
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
        {/* ─── SHARED BRANDING HEADER GROUP ─── */}
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 400,
              letterSpacing: "0.25em",
              color: "primary.main",
              fontSize: { xs: "3rem", md: "4.5rem" },
              fontFamily: "serif",
              mb: 0.5,
              textShadow: "0px 4px 15px rgba(186, 179, 203, 0.6)",
            }}
          >
            SHAFA
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 400,
              letterSpacing: "0.15em",
              color: "primary.main",
              fontSize: { xs: "0.9rem", md: "1.6rem" },
              fontFamily: "serif",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            HYPNOTHERAPY & WELLNESS
          </Typography>
        </Box>

        {/* ─── SHARED GOLD THIN LINE DIVIDER WITH LOTUS ─── */}
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
          <Box
            sx={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(201,151,69,0) 0%, rgba(201,151,69,0.6) 100%)",
            }}
          />
          <SpaIcon
            sx={{
              color: "secondary.main",
              mx: 2,
              fontSize: "1.6rem",
              transform: "scaleY(0.9)",
            }}
          />
          <Box
            sx={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(270deg, rgba(201,151,69,0) 0%, rgba(201,151,69,0.6) 100%)",
            }}
          />
        </Box>

        {/* ─── COMPONENT CHILDREN CONTENT INJECTION SPECTRUM ─── */}
        {children}

        {/* ─── SHARED FIXED IMMUTABLE BOTTOM MOTTO BLOCK ─── */}
        <Box sx={{ textAlign: "center", mt: { xs: 2, md: 4 } }}>
          <Typography
            variant="h4"
            sx={{
              fontStyle: "italic",
              fontWeight: 300,
              letterSpacing: "0.05em",
              color: "primary.main",
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontFamily: "serif",
              mb: 1,
              textShadow: "0px 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            Healing begins within
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Noto Naskh Arabic", serif',
              color: "primary.light",
              fontWeight: 300,
              fontSize: { xs: "1.25rem", md: "1.45rem" },
              textShadow: "0px 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            شفا از درون آغاز می‌شود
          </Typography>

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
