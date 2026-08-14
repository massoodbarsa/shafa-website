"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
  useTheme,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LayoutWrapper from "@/components/LayoutWrapper";
import { motion } from "framer-motion";

import enTranslations from "../../../messages/en.json";
import faTranslations from "../../../messages/fa.json";
import { useLanguage } from "@/context/LanguageContext";

const MotionBox = motion.create(Box);
const MotionStack = motion.create(Stack);
const MotionPaper = motion.create(Paper);

export default function CertificatesPage() {
  const { lang } = useLanguage();
  const isRtl = lang === "fa";
  const t = isRtl ? faTranslations : enTranslations;
  const page = t.certificatesPage;

  // If translations are missing, return null or a fallback
  if (!page) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography>Content not available in this language.</Typography>
      </Box>
    );
  }

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

  const theme = useTheme();

  return (
    <Box
      dir={isRtl ? "rtl" : "ltr"}
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "red",
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
          {/* Heading */}
          <MotionStack
            spacing={2}
            variants={itemVariants}
            sx={{
              alignItems: "center",
              maxWidth: 800,
              mx: "auto",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 500,
                letterSpacing: isRtl ? "0" : "0.12em",
                color: "primary.main",
                fontSize: { xs: "2.2rem", md: "3.2rem" },
                textAlign: "center",
              }}
            >
              {page.title}
            </Typography>

            {/* Geometric separator */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: 160,
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

            {page.subtitle && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  textAlign: "center",
                  fontWeight: 400,
                  maxWidth: "90%",
                  fontFamily: isRtl
                    ? '"Noto Naskh Arabic", sans-serif'
                    : "Georgia, serif",
                }}
              >
                {page.subtitle}
              </Typography>
            )}
          </MotionStack>

          {/* Main Content */}
          <MotionBox
            variants={itemVariants}
            sx={{
              width: "100%",
              maxWidth: 960,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {/* Intro Paragraph */}
            {page.intro && (
              <Typography
                variant="body1"
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "1.05rem", md: "1.2rem" },
                  lineHeight: { xs: 1.9, md: 2.1 },
                  fontWeight: 400,
                  textAlign: isRtl ? "justify" : "left",
                  fontFamily: isRtl
                    ? '"Noto Naskh Arabic", sans-serif'
                    : "Georgia, serif",
                  mb: 1,
                }}
              >
                {page.intro}
              </Typography>
            )}

            {/* Certificates Grid / List */}
            <Stack spacing={3}>
              {page.certificates?.map((cert, idx) => (
                <MotionPaper
                  key={idx}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "rgba(88, 62, 147, 0.15)",
                    bgcolor: "rgba(88, 62, 147, 0.03)",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: { xs: 2, sm: 3 },
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "rgba(88, 62, 147, 0.07)",
                      borderColor: "rgba(88, 62, 147, 0.3)",
                      boxShadow: theme.shadows[2],
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 48,
                      height: 48,
                      borderRadius: "50%",
                      bgcolor: "rgba(88, 62, 147, 0.1)",
                      color: "primary.main",
                      flexShrink: 0,
                    }}
                  >
                    <SchoolIcon fontSize="medium" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                        mb: 0.5,
                        textAlign: isRtl ? "right" : "left",
                        fontFamily: isRtl
                          ? '"Noto Naskh Arabic", sans-serif'
                          : "inherit",
                      }}
                    >
                      {cert.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.primary",
                        fontSize: { xs: "0.98rem", md: "1.08rem" },
                        lineHeight: { xs: 1.7, md: 1.9 },
                        textAlign: isRtl ? "justify" : "left",
                        fontFamily: isRtl
                          ? '"Noto Naskh Arabic", sans-serif'
                          : "Georgia, serif",
                        opacity: 0.85,
                      }}
                    >
                      {cert.description}
                    </Typography>
                  </Box>
                </MotionPaper>
              ))}
            </Stack>

            {/* Conclusion */}
            {page.conclusion && (
              <Box
                sx={{
                  mt: { xs: 3, md: 4 },
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  bgcolor: "rgba(88, 62, 147, 0.06)",
                  border: "1px solid rgba(88, 62, 147, 0.12)",
                  textAlign: isRtl ? "center" : "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    fontSize: { xs: "1.05rem", md: "1.15rem" },
                    lineHeight: { xs: 1.9, md: 2.05 },
                    fontWeight: 500,
                    fontFamily: isRtl
                      ? '"Noto Naskh Arabic", sans-serif'
                      : "Georgia, serif",
                    fontStyle: "italic",
                  }}
                >
                  {page.conclusion}
                </Typography>
              </Box>
            )}
          </MotionBox>
        </Container>
      </LayoutWrapper>
    </Box>
  );
}
