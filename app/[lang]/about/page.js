"use client";

import React from "react";
import { Box, Container, Typography, Stack, Grid } from "@mui/material";
import LayoutWrapper from "@/components/LayoutWrapper";
import { motion } from "framer-motion";
import enTranslations from "../../../messages/en.json";
import faTranslations from "../../../messages/fa.json";
import { useLanguage } from "@/context/LanguageContext";
import GeometricSeparator from "@/components/GeometricSeparator";

const MotionBox = motion.create(Box);
const MotionStack = motion.create(Stack);

export default function AboutMePage() {
  const { lang } = useLanguage();
  const isRtl = lang === "fa";
  const t = isRtl ? faTranslations : enTranslations;
  const page = t.aboutmePage;

  const sectionAnimation = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7 },
  };

  const sectionSx = {
    maxWidth: 900,
    width: "100%",
    mx: "auto",
    mt: { xs: 3, md: 6 },
    textAlign: isRtl ? "right" : "left",
    color: "primary.main",
  };

  const headingSx = {
    fontWeight: 500,
    fontSize: { xs: "1.7rem", md: "2rem" },
    lineHeight: 1.4,
    mb: 2,
  };

  const textSx = {
    fontSize: { xs: "1.05rem", md: "1.2rem" },
    lineHeight: { xs: 1.9, md: 2.1 },
    fontWeight: 400,
    color: "text.primary",
  };

  return (
    <LayoutWrapper>
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 7, md: 11 },
          direction: isRtl ? "rtl" : "ltr",
        }}
      >
        {/* ===================================================== */}
        {/* PAGE HEADER */}
        {/* ===================================================== */}

        {/* ===================================================== */}
        {/* PAGE HEADER */}
        {/* ===================================================== */}

        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
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
              mb: 1.5,
            }}
          >
            {page.title}
          </Typography>

          {/* Geometric separator */}
          <GeometricSeparator />
        </MotionBox>

        {/* ===================================================== */}
        {/* NAME + PROFESSIONAL TITLE */}
        {/* ===================================================== */}

        <MotionBox
          {...sectionAnimation}
          sx={{
            ...sectionSx,
            mt: { xs: 5, md: 7 },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: isRtl
                ? '"Noto Naskh Arabic", sans-serif'
                : "Georgia, serif",
              fontSize: { xs: "1.8rem", md: "2.3rem" },
              fontWeight: 500,
              mb: 1,
            }}
          >
            {page.name}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              color: "primary.light",
              lineHeight: 1.7,
            }}
          >
            {page.professionalTitle}
          </Typography>
        </MotionBox>

        {/* ===================================================== */}
        {/* INTRODUCTION */}
        {/* ===================================================== */}

        <MotionBox {...sectionAnimation} sx={sectionSx}>
          <Typography sx={headingSx}>{page.introTitle}</Typography>

          <Typography sx={textSx}>{page.intro}</Typography>
        </MotionBox>

        {/* ===================================================== */}
        {/* BACKGROUND */}
        {/* ===================================================== */}

        <MotionBox {...sectionAnimation} sx={sectionSx}>
          <Typography sx={headingSx}>{page.backgroundTitle}</Typography>

          <Typography sx={textSx}>{page.background}</Typography>
        </MotionBox>

        {/* ===================================================== */}
        {/* BELIEF */}
        {/* ===================================================== */}

        <MotionBox {...sectionAnimation} sx={sectionSx}>
          <Typography sx={headingSx}>{page.belief.title}</Typography>

          <Typography sx={textSx}>{page.belief.text}</Typography>
        </MotionBox>

        {/* ===================================================== */}
        {/* MIND & BEHAVIOR */}
        {/* ===================================================== */}

        <MotionBox {...sectionAnimation} sx={sectionSx}>
          <Typography sx={headingSx}>{page.mindAndBehaviorTitle}</Typography>

          <Typography sx={textSx}>{page.mindAndBehavior}</Typography>
        </MotionBox>

        {/* ===================================================== */}
        {/* HOW I WORK */}
        {/* ===================================================== */}

        <MotionBox {...sectionAnimation} sx={sectionSx}>
          <Typography sx={headingSx}>{page.work.title}</Typography>

          <Typography sx={textSx}>{page.work.text}</Typography>
        </MotionBox>

        {/* ===================================================== */}
        {/* PROGRAMS */}
        {/* ===================================================== */}

        <MotionBox {...sectionAnimation} sx={sectionSx}>
          <Typography sx={headingSx}>{page.programs.title}</Typography>

          <Typography sx={textSx}>{page.programs.text}</Typography>
        </MotionBox>

        {/* ===================================================== */}
        {/* MY APPROACH */}
        {/* ===================================================== */}

        <MotionBox {...sectionAnimation} sx={sectionSx}>
          <Typography sx={headingSx}>{page.approach.title}</Typography>

          <Typography
            sx={{
              ...textSx,
              mb: 3,
            }}
          >
            {page.approach.text}
          </Typography>

          <Typography sx={textSx}>{page.approach.goal}</Typography>
        </MotionBox>

        {/* ===================================================== */}
        {/* SHAFA MEANING */}
        {/* ===================================================== */}

        <MotionBox {...sectionAnimation} sx={sectionSx}>
          <Typography sx={headingSx}>{page.shafaMeaning.title}</Typography>

          <Typography
            sx={{
              ...textSx,
              mb: 3,
            }}
          >
            {page.shafaMeaning.text}
          </Typography>

          <Typography
            sx={{
              fontFamily: isRtl
                ? '"Noto Naskh Arabic", sans-serif'
                : "Georgia, serif",
              fontSize: { xs: "1.3rem", md: "1.6rem" },
              lineHeight: 1.7,
              fontWeight: 500,
            }}
          >
            {page.shafaMeaning.quote}
          </Typography>
        </MotionBox>

        {/* ===================================================== */}
        {/* CERTIFICATIONS */}
        {/* ===================================================== */}

        {page.certificates?.length > 0 && (
          <MotionBox {...sectionAnimation} sx={sectionSx}>
            <Typography sx={headingSx}>{page.certificatesTitle}</Typography>

            <Grid
              container
              spacing={{ xs: 3, md: 4 }}
              sx={{
                mt: 1,
              }}
            >
              {page.certificates.map((certificate, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {certificate.image && (
                      <Box
                        component="img"
                        src={certificate.image}
                        alt={certificate.alt || certificate.title}
                        sx={{
                          width: "100%",
                          aspectRatio: "4 / 3",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        mt: 2,
                        fontWeight: 500,
                        fontSize: "1rem",
                      }}
                    >
                      {certificate.title}
                    </Typography>

                    {certificate.description && (
                      <Typography
                        sx={{
                          mt: 1,
                          fontSize: "0.9rem",
                          lineHeight: 1.7,
                          color: "text.secondary",
                        }}
                      >
                        {certificate.description}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </MotionBox>
        )}

        {/* ===================================================== */}
        {/* FINAL STATEMENT */}
        {/* ===================================================== */}

        <MotionBox
          {...sectionAnimation}
          sx={{
            ...sectionSx,
            mt: { xs: 9, md: 12 },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: isRtl
                ? '"Noto Naskh Arabic", sans-serif'
                : "Georgia, serif",
              fontSize: { xs: "1.4rem", md: "1.8rem" },
              lineHeight: 1.7,
              fontWeight: 500,
            }}
          >
            {page.conclusion}
          </Typography>
        </MotionBox>
      </Container>
    </LayoutWrapper>
  );
}
