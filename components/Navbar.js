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
} from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Navbar() {
  const { texts, lang, changeLanguage } = useLanguage();
  const router = useRouter();

  // Unified inline state toggle engine for the sub-link group
  const [subLinksOpen, setSubLinksOpen] = useState(false);

  const handleToggleSubLinks = () => {
    setSubLinksOpen((prev) => !prev);
  };

  const handleNavigation = (routePath) => {
    setSubLinksOpen(false); // Collapses sub-menus securely during routing hops
    router.push(`/${lang}/${routePath}`);
  };

  const handleLanguageSwitch = (targetLang) => {
    changeLanguage(targetLang);
    if (typeof window !== "undefined") {
      const currentSubPath = window.location.pathname.split("/").pop();
      router.push(`/${targetLang}/${currentSubPath || "home"}`);
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(29, 19, 55, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(197, 168, 128, 0.15)",
        // Standardizes the full navbar to use LTR positioning at all times, no RTL mirroring
        direction: "ltr !important",
      }}
    >
      {/* ─── MAIN HEADER ROW NAVIGATION TRACK ─── */}
      <Toolbar
        sx={{ justifyContent: "space-between", px: { xs: 2, md: 6 }, py: 1 }}
      >
        {/* Logo Branding Vector */}
        <Box
          onClick={() => handleNavigation("home")}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
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
            }}
          >
            HYPNOTHERAPY & WELLNESS
          </Typography>
        </Box>

        {/* Navigation Action Buttons Group */}
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
              "&:hover": { color: "#C5A880" },
            }}
          >
            {" "}
            {texts.nav.hypnotherapy}
          </Button>

          <Button
            onClick={() => handleNavigation("areas-of-focus")}
            sx={{
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 300,
              "&:hover": { color: "#C5A880" },
            }}
          >
            {texts.nav.areas}
          </Button>

          {/* ─── SECURE TOGGLE ANCHOR: PACKAGES LINK BUTTON ─── */}
          <Button
            onClick={handleToggleSubLinks}
            onMouseEnter={() => setSubLinksOpen(true)} // Opens inline panel immediately on mouse entry
            endIcon={
              <KeyboardArrowDownIcon
                sx={{
                  color: "#C5A880",
                  fontSize: "0.9rem",
                  transform: subLinksOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            }
            sx={{
              color: subLinksOpen ? "#C5A880" : "white",
              fontSize: "0.85rem",
              fontWeight: 300,
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

        {/* Translation Switches Bar */}
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Stack direction="row" spacing={0.5} sx={{ mr: 1 }}>
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
                "&:hover": {
                  bgcolor: lang === "en" ? "#B3966E" : "rgba(255,255,255,0.08)",
                },
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
                "&:hover": {
                  bgcolor: lang === "fa" ? "#B3966E" : "rgba(255,255,255,0.08)",
                },
              }}
            >
              FA
            </Button>
          </Stack>
        </Stack>
      </Toolbar>

      {/* ─── INLINE COLLAPSIBLE ACCORDIAN-FLEX DRAWER FOR PACKAGES (ZERO DROPS) ─── */}
      <Collapse in={subLinksOpen} timeout="auto" unmountOnExit>
        <Box
          onMouseLeave={() => setSubLinksOpen(false)} // Safely closes when the cursor leaves the panel boundary
          sx={{
            width: "100%",
            backgroundColor: "rgba(29, 19, 55, 0.95)",
            borderBottom: "1px solid rgba(197, 168, 128, 0.25)",
            py: 1.5,
            display: "flex",
            justifyContent: "center",
            gap: { xs: 2, md: 4 },
          }}
        >
          {/* Sub Option 1: Meditation */}
          <Button
            onClick={() => handleNavigation("meditation")}
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.8rem",
              fontWeight: 300,
              textTransform: "none",
              fontFamily:
                lang === "fa" ? '"Noto Naskh Arabic", serif' : "inherit",
              "&:hover": { color: "#C5A880" },
            }}
          >
            {lang === "fa"
              ? "مدیتیشن از پایه تا پیشرفته"
              : "Meditation from Basic to Advanced"}
          </Button>

          {/* Sub Option 2: Inner Child Healing */}
          <Button
            onClick={() => handleNavigation("inner-child")}
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.8rem",
              fontWeight: 300,
              textTransform: "none",
              fontFamily:
                lang === "fa" ? '"Noto Naskh Arabic", serif' : "inherit",
              "&:hover": { color: "#C5A880" },
            }}
          >
            {lang === "fa"
              ? "پکیج شفای کودک درون"
              : "Inner Child Healing Package"}
          </Button>

          {/* Sub Option 3: Self-Hypnosis Training */}
          <Button
            onClick={() => handleNavigation("self-hypnosis")}
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.8rem",
              fontWeight: 300,
              textTransform: "none",
              fontFamily:
                lang === "fa" ? '"Noto Naskh Arabic", serif' : "inherit",
              "&:hover": { color: "#C5A880" },
            }}
          >
            {lang === "fa" ? "آموزش خودهیپنوتیزم" : "Self-Hypnosis Training"}
          </Button>

          <Button
            onClick={() => handleNavigation("eft")}
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.8rem",
              fontWeight: 300,
              textTransform: "none",
              fontFamily:
                lang === "fa" ? '"Noto Naskh Arabic", serif' : "inherit",
              "&:hover": { color: "#C5A880" },
            }}
          >
            {lang === "fa" ? " ای اف تی" : "EFT"}
          </Button>
        </Box>
      </Collapse>
    </AppBar>
  );
}
