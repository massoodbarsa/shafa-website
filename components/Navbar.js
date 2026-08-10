"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  Typography,
  Box,
  Collapse,
  IconButton,
  Divider,
} from "@mui/material";

import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const { texts, lang, changeLanguage } = useLanguage();
  const router = useRouter();

  const [subLinksOpen, setSubLinksOpen] = useState(false); // desktop packages
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);

  const isRtl = lang === "fa";

  const handleNavigation = (routePath) => {
    setSubLinksOpen(false);
    setMobileOpen(false);
    setMobilePackagesOpen(false);
    router.push(`/${lang}/${routePath}`);
  };

  const handleLanguageSwitch = (targetLang) => {
    if (lang === targetLang) return;

    setMobileOpen(false);
    setMobilePackagesOpen(false);
    setSubLinksOpen(false);

    React.startTransition(() => {
      changeLanguage(targetLang);

      if (typeof window !== "undefined") {
        const pathParts = window.location.pathname.split("/").filter(Boolean);
        const currentSubPath = pathParts[1] || "home";
        router.push(`/${targetLang}/${currentSubPath}`);
      }
    });
  };

  const packageItems = [
    {
      label:
        lang === "fa"
          ? "مدیتیشن از پایه تا پیشرفته"
          : "Meditation from Basic to Advanced",
      path: "meditation",
    },
    {
      label:
        lang === "fa" ? "پکیج شفای کودک درون" : "Inner Child Healing Package",
      path: "inner-child",
    },
    {
      label: lang === "fa" ? "آموزش خودهیپنوتیزم" : "Self-Hypnosis Training",
      path: "self-hypnosis",
    },
    {
      label: lang === "fa" ? "ای اف تی" : "EFT",
      path: "eft",
    },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(29, 19, 55, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(197, 168, 128, 0.15)",
        direction: "ltr !important",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, md: 6 },
          py: 1,
        }}
      >
        {/* LOGO */}
        <Box
          onClick={() => router.push(`/${lang}/home`)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            flexShrink: 0,
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
              whiteSpace: "nowrap",
            }}
          >
            HYPNOTHERAPY & WELLNESS
          </Typography>
        </Box>

        {/* ================= DESKTOP NAV ================= */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => handleNavigation("home")}
            sx={{
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 300,
              fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "inherit",
              "&:hover": { color: "#C5A880" },
            }}
          >
            {texts.nav.home}
          </Button>

          <Button
            onClick={() => handleNavigation("hypnotherapy")}
            sx={{
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 300,
              fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "inherit",
              "&:hover": { color: "#C5A880" },
            }}
          >
            {texts.nav.hypnotherapy}
          </Button>

          <Button
            onClick={() => handleNavigation("areas-of-focus")}
            sx={{
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 300,
              fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "inherit",
              "&:hover": { color: "#C5A880" },
            }}
          >
            {texts.nav.areas}
          </Button>

          {/* Desktop Packages */}
          <Button
            onClick={() => setSubLinksOpen((p) => !p)}
            onMouseEnter={() => setSubLinksOpen(true)}
            endIcon={
              <KeyboardArrowDownIcon
                sx={{
                  color: "#C5A880",
                  fontSize: "0.9rem",
                  transform: subLinksOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              />
            }
            sx={{
              color: subLinksOpen ? "#C5A880" : "white",
              fontSize: "0.85rem",
              fontWeight: 300,
              fontFamily: isRtl ? '"Noto Naskh Arabic", sans-serif' : "inherit",
              "&:hover": { color: "#C5A880" },
            }}
          >
            {texts.nav.packages}
          </Button>

          <Button
            onClick={() => handleNavigation("workshops")}
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
            onClick={() => handleNavigation("about")}
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
            onClick={() => handleNavigation("contact")}
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

        {/* Desktop Language */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Button
            size="small"
            onClick={() => handleLanguageSwitch("en")}
            sx={{
              color: lang === "en" ? "#120B24" : "white",
              bgcolor: lang === "en" ? "#C5A880" : "transparent",
              borderRadius: 0,
              fontSize: "0.75rem",
              minWidth: 35,
              p: "4px 8px",
            }}
          >
            EN
          </Button>
          <Button
            size="small"
            onClick={() => handleLanguageSwitch("fa")}
            sx={{
              color: lang === "fa" ? "#120B24" : "white",
              bgcolor: lang === "fa" ? "#C5A880" : "transparent",
              borderRadius: 0,
              fontSize: "0.75rem",
              minWidth: 35,
              p: "4px 8px",
            }}
          >
            FA
          </Button>
        </Stack>

        {/* ========== HAMBURGER ========== */}
        <IconButton
          onClick={() => setMobileOpen((prev) => !prev)}
          sx={{
            display: { xs: "flex", md: "none" },
            color: "#C5A880",
            border: "1px solid rgba(197, 168, 128, 0.35)",
            borderRadius: "8px",
            width: 44,
            height: 44,
          }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>

      {/* ================= DESKTOP PACKAGES DROPDOWN ================= */}
      <Collapse in={subLinksOpen} timeout="auto" unmountOnExit>
        <Box
          onMouseEnter={() => setSubLinksOpen(true)}
          onMouseLeave={() => setSubLinksOpen(false)}
          sx={{
            display: { xs: "none", md: "flex" },
            width: "100%",
            backgroundColor: "rgba(29, 19, 55, 0.95)",
            borderBottom: "1px solid rgba(197, 168, 128, 0.25)",
            py: 1.5,
            justifyContent: "center",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          {packageItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "0.8rem",
                fontWeight: 300,
                textTransform: "none",
                fontFamily: isRtl ? '"Noto Naskh Arabic", serif' : "inherit",
                "&:hover": { color: "#C5A880" },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Collapse>

      {/* ================= MOBILE MENU (expands under navbar) ================= */}
      <Collapse in={mobileOpen} timeout="auto" unmountOnExit>
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            background: "rgba(29, 19, 55, 0.97)",
            borderBottom: "1px solid rgba(197, 168, 128, 0.25)",
            px: 2,
            py: 1.5,
          }}
        >
          <Stack spacing={0.5}>
            {[
              { label: texts.nav.home, path: "home" },
              { label: texts.nav.hypnotherapy, path: "hypnotherapy" },
              { label: texts.nav.areas, path: "areas-of-focus" },
            ].map((item) => (
              <Button
                key={item.path}
                fullWidth
                onClick={() => handleNavigation(item.path)}
                sx={{
                  justifyContent: isRtl ? "flex-end" : "flex-start",
                  color: "white",
                  fontWeight: 300,
                  fontFamily: isRtl ? '"Noto Naskh Arabic", serif' : "inherit",
                  "&:hover": { color: "#C5A880" },
                }}
              >
                {item.label}
              </Button>
            ))}

            {/* Packages accordion */}
            <Button
              fullWidth
              onClick={() => setMobilePackagesOpen((p) => !p)}
              endIcon={
                <KeyboardArrowDownIcon
                  sx={{
                    color: "#C5A880",
                    transform: mobilePackagesOpen ? "rotate(180deg)" : "none",
                    transition: "0.2s",
                  }}
                />
              }
              sx={{
                justifyContent: isRtl ? "flex-end" : "flex-start",
                color: "white",
                fontWeight: 300,
                fontFamily: isRtl ? '"Noto Naskh Arabic", serif' : "inherit",
                "&:hover": { color: "#C5A880" },
              }}
            >
              {texts.nav.packages}
            </Button>

            <Collapse in={mobilePackagesOpen}>
              <Box sx={{ pl: isRtl ? 0 : 2, pr: isRtl ? 2 : 0 }}>
                {packageItems.map((item) => (
                  <Button
                    key={item.path}
                    fullWidth
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      justifyContent: isRtl ? "flex-end" : "flex-start",
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "0.85rem",
                      fontWeight: 300,
                      fontFamily: isRtl
                        ? '"Noto Naskh Arabic", serif'
                        : "inherit",
                      "&:hover": { color: "#C5A880" },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            </Collapse>

            {[
              { label: texts.nav.workshops, path: "workshops" },
              { label: texts.nav.about, path: "about" },
              { label: texts.nav.contact, path: "contact" },
            ].map((item) => (
              <Button
                key={item.path}
                fullWidth
                onClick={() => handleNavigation(item.path)}
                sx={{
                  justifyContent: isRtl ? "flex-end" : "flex-start",
                  color: "white",
                  fontWeight: 300,
                  fontFamily: isRtl ? '"Noto Naskh Arabic", serif' : "inherit",
                  "&:hover": { color: "#C5A880" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          <Divider sx={{ my: 1.5, borderColor: "rgba(197,168,128,0.2)" }} />

          {/* Language switch */}
          <Stack direction="row" spacing={1} justifyContent="center">
            <Button
              size="small"
              onClick={() => handleLanguageSwitch("en")}
              sx={{
                minWidth: 70,
                color: lang === "en" ? "#120B24" : "white",
                bgcolor: lang === "en" ? "#C5A880" : "rgba(255,255,255,0.05)",
              }}
            >
              EN
            </Button>
            <Button
              size="small"
              onClick={() => handleLanguageSwitch("fa")}
              sx={{
                minWidth: 70,
                color: lang === "fa" ? "#120B24" : "white",
                bgcolor: lang === "fa" ? "#C5A880" : "rgba(255,255,255,0.05)",
              }}
            >
              FA
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </AppBar>
  );
}
