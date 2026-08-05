"use client";

import { Box, Typography, Button, Stack, Container } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function Welcome() {
  const { texts } = useLanguage();

  return (
    <Box sx={{ py: 10, bgcolor: "#f8f5fc" }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
          {texts.welcomeTitle}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "1.15rem",
            color: "text.secondary",
            maxWidth: 600,
            mx: "auto",
            mb: 4,
            lineHeight: 1.8,
            lineHeight: 1.8,
          }}
        >
          {texts.welcomeText}
        </Typography>

        <Button variant="contained" size="large" color="primary">
          {texts.learnMore}
        </Button>
      </Container>
    </Box>
  );
}
