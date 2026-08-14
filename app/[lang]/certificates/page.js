"use client";

import React from "react";
import { Box, Container, Typography, Stack, Grid } from "@mui/material";
import LayoutWrapper from "@/components/LayoutWrapper";
import { motion } from "framer-motion";
import CertificateFrame from "@/components/CertificateFrame";

import enTranslations from "../../../messages/en.json";
import faTranslations from "../../../messages/fa.json";
import { useLanguage } from "@/context/LanguageContext";

const MotionBox = motion.create(Box);
const MotionStack = motion.create(Stack);

export default function CertificatesPage() {
  const { lang } = useLanguage();
  const isRtl = lang === "fa";
  const t = isRtl ? faTranslations : enTranslations;
  const page = t.certificatesPage;

  if (!page) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography>Content not available in this language.</Typography>
      </Box>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
                  color: "text.primary",
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

          {/* Intro */}
          {page.intro && (
            <MotionBox variants={itemVariants}>
              <Typography
                variant="body1"
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "1.05rem", md: "1.2rem" },
                  lineHeight: { xs: 1.9, md: 2.1 },
                  textAlign: isRtl ? "justify" : "left",
                  maxWidth: 800,
                  mx: "auto",
                  fontFamily: isRtl
                    ? '"Noto Naskh Arabic", sans-serif'
                    : "Georgia, serif",
                }}
              >
                {page.intro}
              </Typography>
            </MotionBox>
          )}

          {/* Certificate Gallery */}
          <MotionBox variants={itemVariants} sx={{ mt: 2 }}>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              display="flex"
              flexDirection="row"
              //   alignItems="stretch"
            >
              {page.certificates?.map((cert, idx) => (
                <Container
                  xs={12}
                  md={6}
                  key={idx}
                  display="flex"
                  flexDirection="row"
                >
                  <CertificateFrame
                    title={cert.title}
                    description={cert.description}
                    imageSrc={cert.image}
                    imageAlt={cert.alt}
                    isRtl={isRtl}
                  />
                </Container>
              ))}
            </Grid>
          </MotionBox>

          {/* Conclusion */}
          {page.conclusion && (
            <MotionBox variants={itemVariants}>
              <Box
                sx={{
                  mt: { xs: 2, md: 3 },
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  bgcolor: "rgba(88, 62, 147, 0.06)",
                  border: "1px solid rgba(88, 62, 147, 0.12)",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    fontSize: { xs: "1.05rem", md: "1.15rem" },
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
            </MotionBox>
          )}
        </Container>
      </LayoutWrapper>
    </Box>
  );
}
