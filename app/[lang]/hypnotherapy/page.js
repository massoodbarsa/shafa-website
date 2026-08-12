"use client";

import React from "react";
import { Box, Container, Typography, Stack, Button } from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LayoutWrapper from "@/components/LayoutWrapper";
import { motion } from "framer-motion";

import enTranslations from "../../../messages/en.json";
import faTranslations from "../../../messages/fa.json";
import { useLanguage } from "@/context/LanguageContext";

const MotionBox = motion.create(Box);

export default function HypnotherapyPage() {
  const { lang } = useLanguage();
  const isRtl = lang === "fa";
  const t = isRtl ? faTranslations : enTranslations;

  // Staggered entrance animation variants for layout fluidity
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] },
    },
  };

  // Splits descriptions by either double escaped '\\n\\n' or normal literal newline tokens safely
  const paragraphs = t.hypnotherapyPage.description.includes("\\n\\n")
    ? t.hypnotherapyPage.description.split("\\n\\n")
    : t.hypnotherapyPage.description.split("\n\n");

  return (
    <Box
      dir={isRtl ? "rtl" : "ltr"}
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <LayoutWrapper>
        <Container
          maxWidth="lg"
          component={MotionBox}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          sx={{
            py: { xs: 6, md: 10 },
            px: { xs: 2.5, md: 4 },
            display: "flex",
            flexDirection: "column",

            gap: { xs: 4, md: 5 },
          }}
        >
          {/* Decorative Top Accent Icon Wrapper */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "secondary.main",
              mb: -2,
            }}
          >
            {/* <SpaIcon
              sx={{
                fontSize: "2.5rem",
                filter: "drop-shadow(0px 0px 8px rgba(201,151,69,0.3))",
              }}
            /> */}
          </Box>

          {/* Section Dynamic Heading Block */}
          <Stack
            spacing={2}
            alignItems="center"
            sx={{ maxWidth: 800 }}
            component={motion.div}
            variants={itemVariants}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 500,
                letterSpacing: isRtl ? "0" : "0.12em",
                color: "primary.main", // Clean deep dark purple font choice
                fontSize: { xs: "2.2rem", md: "3.2rem" },
              }}
            >
              {t.hypnotherapyPage.title}
            </Typography>

            {/* Custom Aesthetic Multi-dot Geometric Horizontal Rule Separator */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "160px",
                pt: 0.5,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, rgba(29,19,55,0) 0%, #1D1337 100%)",
                  opacity: 0.3,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mx: 1.2,
                  gap: 0.4,
                }}
              >
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    bgcolor: "#1D1337",
                    transform: "rotate(45deg)",
                    opacity: 0.4,
                  }}
                />
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    bgcolor: "#1D1337",
                    transform: "rotate(45deg)",
                    opacity: 0.8,
                  }}
                />
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    bgcolor: "#1D1337",
                    transform: "rotate(45deg)",
                    opacity: 0.4,
                  }}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  height: "1px",
                  background:
                    "linear-gradient(270deg, rgba(29,19,55,0) 0%, #1D1337 100%)",
                  opacity: 0.3,
                }}
              />
            </Box>
          </Stack>

          {/* Clean Transparent Text Layout Block Container without Background Masks */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              width: "100%",
              maxWidth: "960px",
              display: "flex",
              flexDirection: "column",
              gap: 3.5, // Even spacing layout gap between generated paragraphs
            }}
          >
            {/* Dynamic string loops generating distinct spacing rows layout outputs */}
            {paragraphs.map((paragraph, idx) => {
              // Filters fallback edge conditions for accidental extra whitespace lines entries
              if (!paragraph.trim()) return null;

              return (
                <>
                  <Typography
                    key={idx}
                    variant="body1"
                    sx={{
                      color: "text.primary", // Elegant deep purple font tone
                      fontSize: { xs: "1.05rem", md: "1.2rem" },
                      lineHeight: { xs: 1.9, md: 2.1 },
                      fontWeight: 400,
                      textAlign: isRtl ? "justify" : "left",
                      fontFamily: isRtl
                        ? '"Noto Naskh Arabic", sans-serif'
                        : "Georgia, serif",
                    }}
                  >
                    {paragraph.trim()}
                  </Typography>
                </>
              );
            })}
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.primary", // Elegant deep purple font tone
                fontSize: { xs: "1.05rem", md: "1.2rem" },
                lineHeight: { xs: 1.9, md: 2.1 },
                fontWeight: 700,
                textAlign: isRtl ? "justify" : "left",
                fontFamily: isRtl
                  ? '"Noto Naskh Arabic", sans-serif'
                  : "Georgia, serif",
              }}
            >
              {t.hypnotherapyPage.subtitle}
            </Typography>

            {/* Interactive Call to Action Layout Integration Footer */}
            {/* <Box
              sx={{
                mt: { xs: 4, md: 5 },
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                endIcon={<AutoAwesomeIcon />}
                href="/booking"
                sx={{
                  px: { xs: 5, md: 7 },
                  py: 1.8,
                  borderRadius: "14px",
                  backgroundColor: "#583E93", // theme primary.main
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  letterSpacing: isRtl ? "0" : "0.05em",
                  gap: 1.2,
                  boxShadow: "0px 5px 25px rgba(88, 62, 147, 0.25)",
                  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  fontFamily: isRtl
                    ? '"Noto Naskh Arabic", sans-serif'
                    : "inherit",
                  "&:hover": {
                    backgroundColor: "#9D6BD9", // theme primary.light
                    transform: "translateY(-3px)",
                    boxShadow: "0px 8px 30px rgba(157, 107, 217, 0.45)",
                  },
                }}
              >
                {t.banner.bannerBtn || "Book a Session"}
              </Button>
            </Box> */}
          </Box>
        </Container>
      </LayoutWrapper>
    </Box>
  );
}
