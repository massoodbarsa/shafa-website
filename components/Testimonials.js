"use client";
import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SpaIcon from "@mui/icons-material/Spa";
import { useLanguage } from "../context/LanguageContext";

export default function Testimonials() {
  const { texts, lang } = useLanguage();

  return (
    <Box sx={{ py: 10, bgcolor: "#fff" }}>
      <Container maxWidth="xl">
        {/* Section Heading Title */}
        <Typography
          variant="h4"
          sx={{
            color: "#201243", // Distinct dark elegant purple title font color
            fontWeight: 500,
            fontFamily: "serif",
            mb: 1.5,
            direction: lang === "fa" ? "rtl" : "ltr",
          }}
        >
          {texts.testomonials.testimonialsTitle}
        </Typography>

        {/* Centered Graphic Accent & Side Horizontal Lines */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 6,
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(197,168,128,0) 0%, rgba(197,168,128,0.5) 100%)",
            }}
          />
          <SpaIcon sx={{ color: "#C5A880", fontSize: "1.3rem" }} />
          <Box
            sx={{
              width: 40,
              height: "1px",
              background:
                "linear-gradient(270deg, rgba(197,168,128,0) 0%, rgba(197,168,128,0.5) 100%)",
            }}
          />
        </Box>

        {/* Responsive Horizontal Row System Container */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            mb: 5,
            direction: lang === "fa" ? "rtl" : "ltr",
          }}
        >
          {texts.testomonials.reviews.map((review, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 4,
                // Layout Math: 3 columns across on desktop window parameters
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.33% - 16px)",
                },
                minHeight: "230px",
                backgroundColor: "transparent",
                border: "1px solid rgba(197, 168, 128, 0.25)", // Soft custom card boundary borders
                borderRadius: "16px", // Lightly softened card outline corners matching layout
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#C5A880",
                  backgroundColor: "rgba(255,255,255,0.4)",
                },
              }}
            >
              {/* Gold 5-Star Ratings Stack Group */}
              <Stack direction="row" spacing={0.5} sx={{ mb: 2.5 }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    sx={{ color: "#C5A880", fontSize: "1.1rem" }}
                  />
                ))}
              </Stack>

              {/* Review Statement Content */}
              <Typography
                variant="body2"
                sx={{
                  color: "#371E6D",
                  lineHeight: 1.7,
                  fontWeight: 400,
                  fontSize: "0.95rem",
                  fontStyle: "italic",
                  mb: 2.5,
                  maxWidth: "280px",
                }}
              >
                {review.text}
              </Typography>

              {/* Review Author Tag */}
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#7C6A9F",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                }}
              >
                {review.author}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Read More Testimonials Capsule CTA Button */}
        {/* <Button
          variant="outlined"
          sx={{
            color: "#371E6D",
            borderColor: "rgba(197, 168, 128, 0.6)",
            borderWidth: "1px",
            borderRadius: "24px", // Matches the rounded border capsule in the layout photo
            px: 4,
            py: 1.2,
            fontSize: "0.9rem",
            textTransform: "none",
            fontWeight: 400,
            backgroundColor: "transparent",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "#371E6D",
              backgroundColor: "rgba(29, 19, 55, 0.03)",
            },
          }}
        >
          {texts.readMoreTestimonials}
        </Button> */}
      </Container>
    </Box>
  );
}
