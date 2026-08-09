"use client";
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Stack,
} from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

// Updated cross-version stable icon names from Material UI
import SpaIcon from "@mui/icons-material/Spa";
import MailIcon from "@mui/icons-material/Mail"; // Fixed replacement
import PhoneIcon from "@mui/icons-material/Phone"; // Fixed replacement
import RoomIcon from "@mui/icons-material/Room"; // Fixed replacement
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import { LinkedIn } from "@mui/icons-material";

export default function Footer() {
  const { texts, lang } = useLanguage();

  const linkedInUrl = "https://www.linkedin.com/in/shabnam-amiri-573a71166/"; // Replace with your actual LinkedIn username
  const instagramUrl = "https://www.instagram.com/your-instagram-username"; // Replace with your actual Instagram username
  const telegramUrl = "https://t.me/your-telegram-username"; // Replace with your actual Telegram username

  return (
    <Box
      sx={{
        bgcolor: "#120B24",
        color: "#FFFFFF",
        pt: 8,
        pb: 4,
        borderTop: "1px solid rgba(197, 168, 128, 0.15)",
        direction: lang === "fa" ? "rtl" : "ltr",
        width: "100%",
        px: { xs: 2, md: 6 },
      }}
    >
      {/* <Container maxWidth="xl"> */}
      <Grid container spacing={5} sx={{ mb: 6 }}>
        {/* COLUMN 1: Logo, Subtitle Branding, & Social Clusters */}
        <Grid item xs={12} md={4}>
          <Box sx={{ pr: { md: 4 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2.5,
                justifyContent: "flex-start",
              }}
            >
              <SpaIcon sx={{ color: "#C5A880", fontSize: "2.8rem" }} />
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 400,
                    letterSpacing: "0.15em",
                    color: "#FFFFFF",
                    fontFamily: "serif",
                    lineHeight: 1.1,
                  }}
                >
                  SHAFA
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.08em",
                    color: "#7C6A9F",
                  }}
                >
                  HYPNOTHERAPY & WELLNESS
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="body1"
              sx={{
                fontFamily: "serif",
                color: "#FFFFFF",
                mb: 1.5,
                fontWeight: 300,
                direction: "rtl",
                textAlign: lang === "fa" ? "right" : "left",
              }}
            >
              شفا ـ به سوی آرامش، آگاهی و تحول
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 4,
                fontStyle: "italic",
                fontWeight: 300,
                textAlign: lang === "fa" ? "right" : "left",
              }}
            >
              {texts.footer.tagline}
            </Typography>

            <Stack
              direction="row"
              spacing={1.5}
              sx={{ justifyContent: "flex-start", direction: "ltr" }}
            >
              {[
                { icon: <LinkedIn />, url: linkedInUrl }, // Replace with your international number format

                { icon: <InstagramIcon />, url: linkedInUrl }, // Replace with your actual username
                { icon: <TelegramIcon />, url: "https://t.me" }, // Replace with your actual username
              ].map((item, idx) => (
                <IconButton
                  key={idx}
                  component="a" // FIXED: Converts the Material UI button into a functional native anchor link tag
                  href={item.url} // FIXED: Passes the targeted web link cleanly
                  target="_blank" // FIXED: Forces the browser to open the link in a fresh, separate tab layer
                  rel="noopener noreferrer" // FIXED: Standard security configuration guard for safe outbound routing hooks
                  sx={{
                    color: "#C5A880",
                    border: "1px solid rgba(197, 168, 128, 0.4)",
                    p: 1.2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#FFFFFF",
                      color: "#FFFFFF",
                      bgcolor: "rgba(197, 168, 128, 0.1)",
                      transform: "translateY(-2px)", // Tiny elegant micro-interaction slide-up animation
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* COLUMN 2: Directory Links Matrix 1 */}
        <Grid item xs={12} sm={4} md={2.5}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#C5A880",
              fontWeight: 500,
              letterSpacing: "0.05em",
              mb: 3,
            }}
          >
            {texts.footer.col1Title}
          </Typography>
          <Stack spacing={1.8}>
            {texts.footer.links1.map((link) => (
              <Link
                key={link}
                href="#"
                underline="none"
                sx={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "0.9rem",
                  fontWeight: 300,
                  "&:hover": { color: "#C5A880" },
                  transition: "color 0.2s",
                }}
              >
                {link}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* COLUMN 3: Directory Links Matrix 2 */}
        <Grid item xs={12} sm={4} md={2.5}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#C5A880",
              fontWeight: 500,
              letterSpacing: "0.05em",
              mb: 3,
            }}
          >
            {texts.footer.col2Title}
          </Typography>
          <Stack spacing={1.8}>
            {texts.footer.links2.map((link) => (
              <Link
                key={link}
                href="#"
                underline="none"
                sx={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "0.9rem",
                  fontWeight: 300,
                  "&:hover": { color: "#C5A880" },
                  transition: "color 0.2s",
                }}
              >
                {link}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* COLUMN 4: Explicit Contact Info Block Rows */}
        <Grid item xs={12} sm={4} md={3}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#C5A880",
              fontWeight: 500,
              letterSpacing: "0.05em",
              mb: 3,
            }}
          >
            {texts.footer.col3Title}
          </Typography>
          <Stack
            spacing={2.5}
            sx={{
              direction: "ltr",
              alignItems: lang === "fa" ? "flex-end" : "flex-start",
            }}
          >
            {/* Email Entry Line */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
                direction: lang === "fa" ? "rtl" : "ltr",
              }}
            >
              <MailIcon sx={{ color: "#C5A880", fontSize: "1.25rem" }} />{" "}
              {/* Swapped tag */}
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 300 }}
              >
                {texts.footer.email}
              </Typography>
            </Stack>

            {/* Phone Entry Line */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
                direction: lang === "fa" ? "rtl" : "ltr",
              }}
            >
              <PhoneIcon sx={{ color: "#C5A880", fontSize: "1.25rem" }} />{" "}
              {/* Swapped tag */}
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 300 }}
              >
                {texts.footer.phone}
              </Typography>
            </Stack>

            {/* Location Address Entry Line */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
                direction: lang === "fa" ? "rtl" : "ltr",
              }}
            >
              <RoomIcon sx={{ color: "#C5A880", fontSize: "1.25rem" }} />{" "}
              {/* Swapped tag */}
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 300 }}
              >
                {texts.footer.address}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {/* BOTTOM METADATA */}
      <Box
        sx={{
          pt: 4,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <SpaIcon
          sx={{ color: "rgba(197, 168, 128, 0.4)", fontSize: "1.4rem" }}
        />
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.03em",
            fontWeight: 300,
            textAlign: "center",
          }}
        >
          {texts.footer.copyright}
        </Typography>
      </Box>
      {/* </Container> */}
    </Box>
  );
}
