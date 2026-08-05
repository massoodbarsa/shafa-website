"use client";

import { Box, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h3" color="primary" gutterBottom>
        SHAFA Hypnotherapy & Wellness
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
        Healing begins within.
      </Typography>
      <Button variant="contained" size="large">
        Book a Session
      </Button>
    </Box>
  );
}
