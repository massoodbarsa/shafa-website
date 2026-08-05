"use client";

import { Box, Typography, Button, Stack } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { texts, lang, changeLanguage } = useLanguage();

  return (
    <Box sx={{ p: 4, textAlign: "center", minHeight: "100vh" }}>
      {/* Language Switcher - always stays on the right */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 4,
          direction: "ltr", // force left-to-right
        }}
      >
        <Stack direction="row" spacing={1}>
          <Button
            variant={lang === "en" ? "contained" : "outlined"}
            size="small"
            onClick={() => changeLanguage("en")}
          >
            English
          </Button>
          <Button
            variant={lang === "fa" ? "contained" : "outlined"}
            size="small"
            onClick={() => changeLanguage("fa")}
          >
            فارسی
          </Button>
        </Stack>
      </Box>

      {/* Main Content */}
      <Typography variant="h2" color="primary" gutterBottom fontWeight={700}>
        {texts.title}
      </Typography>

      <Typography variant="h5" color="text.secondary" gutterBottom>
        {texts.subtitle}
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, mt: 2 }}>
        {texts.tagline}
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" size="large">
          {texts.bookSession}
        </Button>
        <Button variant="outlined" size="large">
          {texts.exploreServices}
        </Button>
      </Stack>
    </Box>
  );
}
