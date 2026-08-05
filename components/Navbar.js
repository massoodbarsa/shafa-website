"use client";

import { AppBar, Toolbar, Button, Stack, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { texts, lang, changeLanguage } = useLanguage();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "primary.main", direction: "ltr" }} // force whole navbar LTR
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
          SHAFA
        </Typography>

        {/* Menu Links */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Button sx={{ color: "white" }}>{texts.nav.home}</Button>
          <Button sx={{ color: "white" }}>{texts.nav.about}</Button>
          <Button sx={{ color: "white" }}>{texts.nav.services}</Button>
          <Button sx={{ color: "white" }}>{texts.nav.packages}</Button>
          <Button sx={{ color: "white" }}>{texts.nav.resources}</Button>
          <Button sx={{ color: "white" }}>{texts.nav.workshops}</Button>
          <Button sx={{ color: "white" }}>{texts.nav.contact}</Button>
        </Stack>

        {/* Language + Book Now */}
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant={lang === "en" ? "contained" : "outlined"}
            onClick={() => changeLanguage("en")}
            sx={{
              color: lang === "en" ? "primary.main" : "white",
              borderColor: "white",
              bgcolor: lang === "en" ? "white" : "transparent",
              minWidth: 40,
            }}
          >
            EN
          </Button>
          <Button
            size="small"
            variant={lang === "fa" ? "contained" : "outlined"}
            onClick={() => changeLanguage("fa")}
            sx={{
              color: lang === "fa" ? "primary.main" : "white",
              borderColor: "white",
              bgcolor: lang === "fa" ? "white" : "transparent",
              minWidth: 40,
            }}
          >
            FA
          </Button>

          <Button
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "primary.main",
              ml: 1,
              "&:hover": { bgcolor: "#f0e6f7" },
            }}
          >
            {texts.nav.bookNow}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
