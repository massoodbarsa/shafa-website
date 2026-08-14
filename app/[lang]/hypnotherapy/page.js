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
const MotionStack = motion.create(Stack);

export default function HypnotherapyPage() {
  const { lang } = useLanguage();
  const isRtl = lang === "fa";
  const t = isRtl ? faTranslations : enTranslations;
  const page = t.hypnotherapyPage;

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
          {/* Decorative top accent */}
          <MotionBox
            variants={itemVariants}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "secondary.main",
              mb: -2,
            }}
          >
            {/* optional SpaIcon */}
          </MotionBox>

          {/* Heading */}
          <MotionStack
            spacing={2}
            variants={itemVariants}
            sx={{
              alignItems: "center", // ← moved into sx (fixes the warning)
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
          </MotionStack>

          {/* Main content */}
          <MotionBox
            variants={itemVariants}
            sx={{
              width: "100%",
              maxWidth: 960,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 3.5,
            }}
          >
            {/* Paragraphs */}
            {page.paragraphs?.map((paragraph, idx) => {
              if (!paragraph?.trim()) return null;
              return (
                <Typography
                  key={idx}
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
                  }}
                >
                  {paragraph.trim()}
                </Typography>
              );
            })}

            {/* Subtitle */}
            {page.subtitle && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "1.05rem", md: "1.2rem" },
                  lineHeight: { xs: 1.9, md: 2.1 },
                  fontWeight: 700,
                  textAlign: isRtl ? "justify" : "left",
                  fontFamily: isRtl
                    ? '"Noto Naskh Arabic", sans-serif'
                    : "Georgia, serif",
                  mt: 1,
                }}
              >
                {page.subtitle}
              </Typography>
            )}

            {/* Myths / Common beliefs */}
            {(page.commonBeliefsTitle || page.whatIsNotTitle) && (
              <Box sx={{ mt: { xs: 4, md: 6 } }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    fontSize: { xs: "1.6rem", md: "2rem" },
                    mb: 2,
                    textAlign: isRtl ? "right" : "left",
                    fontFamily: isRtl
                      ? '"Noto Naskh Arabic", sans-serif'
                      : "inherit",
                  }}
                >
                  {page.commonBeliefsTitle || page.whatIsNotTitle}
                </Typography>

                {page.commonBeliefsIntro && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.primary",
                      fontSize: { xs: "1.05rem", md: "1.15rem" },
                      lineHeight: { xs: 1.9, md: 2.05 },
                      mb: 4,
                      textAlign: isRtl ? "justify" : "left",
                      fontFamily: isRtl
                        ? '"Noto Naskh Arabic", sans-serif'
                        : "Georgia, serif",
                    }}
                  >
                    {page.commonBeliefsIntro}
                  </Typography>
                )}

                <Stack spacing={3.5}>
                  {page.myths?.map((myth, idx) => (
                    <Box key={idx}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "primary.main",
                          fontSize: { xs: "1.1rem", md: "1.25rem" },
                          mb: 1,
                          textAlign: isRtl ? "right" : "left",
                          fontFamily: isRtl
                            ? '"Noto Naskh Arabic", sans-serif'
                            : "inherit",
                        }}
                      >
                        {myth.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.primary",
                          fontSize: { xs: "1.02rem", md: "1.12rem" },
                          lineHeight: { xs: 1.85, md: 2 },
                          textAlign: isRtl ? "justify" : "left",
                          fontFamily: isRtl
                            ? '"Noto Naskh Arabic", sans-serif'
                            : "Georgia, serif",
                        }}
                      >
                        {myth.text}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Conclusion */}
            {page.conclusionTitle && (
              <Box sx={{ mt: { xs: 4, md: 6 } }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    fontSize: { xs: "1.6rem", md: "2rem" },
                    mb: 2,
                    textAlign: isRtl ? "right" : "left",
                    fontFamily: isRtl
                      ? '"Noto Naskh Arabic", sans-serif'
                      : "inherit",
                  }}
                >
                  {page.conclusionTitle}
                </Typography>
                {page.conclusion && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.primary",
                      fontSize: { xs: "1.05rem", md: "1.15rem" },
                      lineHeight: { xs: 1.9, md: 2.05 },
                      textAlign: isRtl ? "justify" : "left",
                      fontFamily: isRtl
                        ? '"Noto Naskh Arabic", sans-serif'
                        : "Georgia, serif",
                    }}
                  >
                    {page.conclusion}
                  </Typography>
                )}
              </Box>
            )}

            {/* Shafa belief */}
            {page.shafaBeliefTitle && (
              <Box
                sx={{
                  mt: { xs: 4, md: 5 },
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  bgcolor: "rgba(88, 62, 147, 0.06)",
                  border: "1px solid rgba(88, 62, 147, 0.12)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    fontSize: { xs: "1.25rem", md: "1.45rem" },
                    mb: 1.5,
                    textAlign: isRtl ? "right" : "left",
                    fontFamily: isRtl
                      ? '"Noto Naskh Arabic", sans-serif'
                      : "inherit",
                  }}
                >
                  {page.shafaBeliefTitle}
                </Typography>
                {page.shafaBelief && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.primary",
                      fontSize: { xs: "1.05rem", md: "1.15rem" },
                      lineHeight: { xs: 1.9, md: 2.05 },
                      fontWeight: 500,
                      textAlign: isRtl ? "justify" : "left",
                      fontFamily: isRtl
                        ? '"Noto Naskh Arabic", sans-serif'
                        : "Georgia, serif",
                    }}
                  >
                    {page.shafaBelief}
                  </Typography>
                )}
              </Box>
            )}
          </MotionBox>
        </Container>
      </LayoutWrapper>
    </Box>
  );
}
