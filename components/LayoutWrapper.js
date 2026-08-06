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
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between", // Uniformly spreads elements top-to-bottom across 100vh
          height: "100%", // Anchors layout strictly inside window height limitations
          py: { xs: 2, md: 4 }, // Small vertical spacing padding
          width: "100%",
        }}
      >
        {/* ─── SHARED BRANDING HEADER GROUP ─── */}
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 400,
              letterSpacing: "0.25em",
              color: "#FFFFFF",
              fontSize: { xs: "3rem", md: "4.5rem" },
              fontFamily: "serif",
              mb: 0.5,
              textShadow: "0px 4px 15px rgba(29, 19, 55, 0.6)",
            }}
          >
            SHAFA
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 400,
              letterSpacing: "0.15em",
              color: "#4A1C6B",
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
        {/* ─── FIXED IMMUTABLE BOTTOM MOTTO BLOCK WITH THEMED GLASS PANEL ─── */}
        <Box
          sx={{
            textAlign: "center",
            mt: { xs: 4, md: 6 },
            px: { xs: 4, md: 8 },
            py: 3,
            width: "100%",
            maxWidth: "500px",
            mx: "auto",

            // ─── THEMED BACKGROUND AND BORDER INTEGRATION ───
            // Uses primary.light (light purple) with 0.25 transparency
            backgroundColor: (theme) =>
              `rgba(${parseInt(theme.palette.primary.light.slice(1, 3), 16)}, ${parseInt(theme.palette.primary.dark.slice(3, 5), 16)}, ${parseInt(theme.palette.primary.light.slice(5, 7), 16)}, 0.25)`,
            backdropFilter: "blur(2px)",

            // Uses secondary.main (gold) for the border stroke vector lines [INDEX]
            border: "2px solid",
            borderColor: "secondary.main",

            borderRadius: "24px",
            boxShadow: "0px 10px 30px rgba(18, 11, 36, 0.35)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontStyle: "italic",
              fontWeight: 300,
              letterSpacing: "0.05em",
              color: "#FFFFFF",
              fontSize: { xs: "1.35rem", md: "1.75rem" },
              fontFamily: "serif",
              mb: 1.5,
              textShadow: "0px 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            Healing begins within.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Noto Naskh Arabic", serif',
              color: "#FFFFFF",
              fontWeight: 300,
              fontSize: { xs: "1.15rem", md: "1.35rem" },
              mb: 2.5,
              textShadow: "0px 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            شفا از درون آغاز می‌شود.
          </Typography>

          {/* Decorative Bottom Rule */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
                fontSize: "1.1rem",
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
