"use client";
import React from "react";
import { AppBar, Toolbar, Button, Stack, Typography, Box } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { texts, lang, changeLanguage } = useLanguage();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(29, 19, 55, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(197, 168, 128, 0.15)",
        // Standardizes row direction globally so elements do not mirror positions
        direction: "ltr !important",
      }}
    >
      <Toolbar
        sx={{ justifyContent: "space-between", px: { xs: 2, md: 6 }, py: 1 }}
      >
        {/* Logo Branding Structure */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#C5A880",
              fontWeight: 500,
              letterSpacing: "0.15em",
              lineHeight: 1.1,
              fontFamily: "serif",
            }}
          >
            SHAFA
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.55rem",
              letterSpacing: "0.05em",
              color: "#7C6A9F",
            }}
          >
            HYPNOTHERAPY & WELLNESS
          </Typography>
        </Box>

        {/* Dynamic Navigation Row Menu */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: { xs: "none", md: "flex" },
            // Ensures text orientation aligns with the language setting
            direction: lang === "fa" ? "rtl" : "ltr",
          }}
        >
          <Button
            sx={{
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 300,
              "&:hover": { color: "#C5A880" },
            }}
          >
            {texts.nav.home}
          </Button>
          <Button
            sx={{
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 300,
              "&:hover": { color: "#C5A880" },
            }}
          >
            {texts.nav.about}
          </Button>
          <Button
            sx={{
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 300,
              "&:hover": { color: "#C5A880" },
            }}
          >
            {texts.nav.services}
          </Button>
          <Button
            sx={{
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 300,
              "&:hover": { color: "#C5A880" },
            }}
          >
            {texts.nav.packages}
          </Button>
          <Button
            sx={{
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 300,
              "&:hover": { color: "#C5A880" },
            }}
          >
            {texts.nav.resources}
          </Button>
          <Button
            sx={{
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 300,
              "&:hover": { color: "#C5A880" },
            }}
          >
            {texts.nav.workshops}
          </Button>
          <Button
            sx={{
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 300,
              "&:hover": { color: "#C5A880" },
            }}
          >
            {texts.nav.contact}
          </Button>
        </Stack>

        {/* Translation Options & Call to Action (CTA) */}
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Stack direction="row" spacing={0.5} sx={{ mr: 1 }}>
            <Button
              size="small"
              onClick={() => changeLanguage("en")}
              sx={{
                color: lang === "en" ? "#120B24" : "white",
                bgcolor: lang === "en" ? "#C5A880" : "transparent",
                borderRadius: 0,
                fontSize: "0.75rem",
                minWidth: 35,
                p: "4px 8px",
                "&:hover": {
                  bgcolor: lang === "en" ? "#B3966E" : "rgba(255,255,255,0.08)",
                },
              }}
            >
              EN
            </Button>
            <Button
              size="small"
              onClick={() => changeLanguage("fa")}
              sx={{
                color: lang === "fa" ? "#120B24" : "white",
                bgcolor: lang === "fa" ? "#C5A880" : "transparent",
                borderRadius: 0,
                fontSize: "0.75rem",
                minWidth: 35,
                p: "4px 8px",
                "&:hover": {
                  bgcolor: lang === "fa" ? "#B3966E" : "rgba(255,255,255,0.08)",
                },
              }}
            >
              FA
            </Button>
          </Stack>

          {/* <Button
            variant="outlined"
            sx={{
              borderColor: "#C5A880",
              color: "#C5A880",
              borderRadius: 0,
              fontSize: "0.8rem",
              p: "6px 16px",
              "&:hover": {
                borderColor: "white",
                color: "white",
                bgcolor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            {texts.nav.bookNow}
          </Button> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
