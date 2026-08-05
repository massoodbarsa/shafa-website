"use client";
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function CallToAction() {
  const { texts, lang } = useLanguage();

  return (
    <Box sx={{ py: 6, bgcolor: "#fff" }}>
      {" "}
      {/* Matches the light background beneath the grid */}
      <Container maxWidth="xl" background="white">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 3, md: 5 },
            background: "linear-gradient(90deg, #371E6D 0%, #201243 100%)", // Rich dark purple gradient background
            borderRadius: "12px", // Distinct rounded box edges matching the image
            px: { xs: 4, md: 8 },
            py: 4,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0px 10px 30px rgba(29, 19, 55, 0.15)",
            direction: lang === "fa" ? "rtl" : "ltr",
          }}
        >
          {/* Decorative Left Line Accent (Visible on desktop) */}
          <Box
            sx={{
              display: { xs: "none", lg: "block" },
              width: "80px",
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(197,168,128,0) 0%, rgba(197,168,128,0.4) 100%)",
              mr: 2,
            }}
          />

          {/* Banner Description Text */}
          <Typography
            variant="h6"
            sx={{
              color: "#FFFFFF",
              fontWeight: 300,
              fontSize: { xs: "1.1rem", md: "1.35rem" },
              letterSpacing: lang === "fa" ? 0 : "0.03em",
              textAlign: "center",
              fontFamily: lang === "fa" ? "inherit" : "serif",
            }}
          >
            {texts.banner.bannerText}
          </Typography>

          {/* Action Call Button */}
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: "#FFFFFF",
              borderColor: "rgba(197, 168, 128, 0.6)", // Soft gold outline container profile
              borderWidth: "1px",
              borderRadius: "24px", // Capsule rounded button styling matching the image blueprint
              px: 5,
              py: 1.2,
              fontSize: "0.95rem",
              textTransform: "none",
              fontWeight: 400,
              whiteSpace: "nowrap",
              backgroundColor: "rgba(91, 33, 182, 0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#C5A880",
                boxShadow: "0px 0px 15px rgba(197, 168, 128, 0.3)",
                backgroundColor: "rgba(197, 168, 128, 0.1)",
              },
            }}
          >
            {texts.banner.bannerBtn}
          </Button>

          {/* Decorative Right Line Accent (Visible on desktop) */}
          <Box
            sx={{
              display: { xs: "none", lg: "block" },
              width: "80px",
              height: "1px",
              background:
                "linear-gradient(270deg, rgba(197,168,128,0) 0%, rgba(197,168,128,0.4) 100%)",
              ml: 2,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
