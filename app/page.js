"use client";
import React from "react";
import { Box, Button, Stack, Avatar, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";
import LanguageIcon from "@mui/icons-material/Language";
import PersianIcon from "../components/svg-icons/PersianIcon";
import LayoutWrapper from "../components/LayoutWrapper";

export default function Home() {
  const { changeLanguage } = useLanguage();
  const router = useRouter();

  const handleSelectLanguage = (targetLang) => {
    changeLanguage(targetLang);
    router.push(`/${targetLang}/home`);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh", // Force absolute viewport height frame execution
        overflow: "hidden", // Completely blocks page scrolling or dynamic shifting strings
        zIndex: 99999,
      }}
    >
      <LayoutWrapper>
        {/* INNER HEIGHT MANAGEMENT LAYER - DISTRIBUTES CONTENT EVENLY NO SCROLL */}
        <Box
          sx={{
            // height: "vh", // Strictly isolates upper card content to stay above bottom block limits
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2, // Tightened vertical row spacing
            width: "100%",
          }}
        >
          {/* ─── PROFILE AVATAR CARD GRID ─── */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              textAlign: "center",
              gap: 3, // Tightened horizontal spacing between avatar and text
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Noto Naskh Arabic", serif',
                  fontWeight: 500,
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  lineHeight: 1.2,
                  letterSpacing: "0.1em",
                  background:
                    "linear-gradient(180deg, #FFFFFF 0%, #d1882fff 30%, #C99745 100%)", // Preserved exact gradient colors
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 0.2,

                  // ─── ADDED A SUNLIGHT SHINE back-glow while preserving exact contrast ───
                  filter: `
      drop-shadow(0px 4px 12px rgba(18, 11, 36, 0.4)) 
      drop-shadow(0px 0px 8px rgba(235, 232, 228, 0.7))
    `,
                }}
              >
                شبنم امیری
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  color: "secondary.main", // Preserved exact theme color link
                  fontWeight: 300,
                  fontSize: { xs: "1.6rem", md: "1.8rem" },
                  wordSpacing: { xs: "8px", md: "10px" },
                  textTransform: "uppercase",
                  fontFamily: "serif",

                  // ─── ADDED SUNLIGHT SHINE BACK-GLOW MATCHED TO METALLIC GOLD VEIN ───
                  filter: `
      drop-shadow(0px 2px 8px rgba(18, 11, 36, 0.4))
      drop-shadow(0px 0px 6px rgba(233, 197, 154, 0.45))
    `,
                }}
              >
                Shabnam Amiri
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: "secondary.main",
                  fontWeight: 200, // Slightly increased from 100 to make the italic slant clearly visible
                  fontStyle: "italic", // FIXED: Forces an elegant italic angle
                  fontSize: { xs: "0.8rem", md: "1rem" }, // FIXED: Scaled to look like a true sub-caption label
                  letterSpacing: "0.15em", // Balanced letter spacing for wide readability
                  fontFamily: '"Playfair Display", "Georgia", "Didot", serif', // FIXED: Premium unique font pairing
                  filter: "drop-shadow(0px 1px 4px rgba(18, 11, 36, 0.4))",
                  opacity: 0.85, // Softens the visibility slightly to stand out from primary titles
                }}
              >
                Certified Hypnotherapist
              </Typography>
            </Box>
            <Avatar
              src="/shabnam.jpeg"
              sx={{
                width: { xs: 120, md: 150 },
                height: { xs: 120, md: 150 },
                border: "2px solid",
                borderColor: "secondary.main",
                boxShadow: "0px 12px 32px rgba(74, 28, 107, 0.45)",
                mb: 1.5,
                backgroundColor: "background.paper",
              }}
            />
          </Box>

          {/* ─── COMPACT LANGUAGE SELECTION TRACKS ─── */}
          <Stack
            direction={{ xs: "row", sm: "row" }}
            spacing={2}
            sx={{
              width: "100%",
              maxWidth: "440px",
              mt: 1,
              direction: "ltr",
              mx: "auto",
            }}
          >
            {/* Persian Gate */}
            <Button
              onClick={() => handleSelectLanguage("fa")}
              sx={{
                flex: 1,
                background: "rgba(88, 62, 147, 0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid",
                borderColor: "secondary.light",
                borderRadius: "16px",
                py: 1.2, // Tightened button padding vectors
                px: 2.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#FFFFFF",
                textTransform: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "secondary.main",
                  background: "rgba(110, 80, 140, 0.6)",
                  boxShadow: "0px 4px 25px rgba(201, 151, 69, 0.2)",
                },
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  border: "1px solid",
                  borderColor: "secondary.light",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PersianIcon size={34} color="#C99745" />
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    fontFamily: '"Noto Naskh Arabic", serif',
                    lineHeight: 1.2,
                  }}
                >
                  فارسی
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Persian
                </Typography>
              </Box>
            </Button>

            {/* English Gate */}
            <Button
              onClick={() => handleSelectLanguage("en")}
              sx={{
                flex: 1,
                background: "rgba(88, 62, 147, 0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid",
                borderColor: "secondary.light",
                borderRadius: "16px",
                py: 1.2,
                px: 2.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#FFFFFF",
                textTransform: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "secondary.main",
                  background: "rgba(110, 80, 140, 0.6)",
                  boxShadow: "0px 4px 25px rgba(201, 151, 69, 0.2)",
                },
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  border: "1px solid",
                  borderColor: "secondary.light",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LanguageIcon
                  sx={{
                    color: "secondary.main",
                    fontSize: "1.5rem",
                    opacity: 0.9,
                  }}
                />
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    fontFamily: "serif",
                    lineHeight: 1.2,
                  }}
                >
                  English
                </Typography>
              </Box>
            </Button>
          </Stack>
        </Box>
      </LayoutWrapper>
    </Box>
  );
}
