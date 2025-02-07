"use client";

import { Container, Typography, Box, Paper } from "@mui/material";
import { Twitter, Instagram } from "@mui/icons-material";

export default function AboutUs() {
  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{ padding: 7, marginTop: 4, borderRadius: 2, position: "relative" }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            About Us
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          Finding a trusted doctor who speaks your language can be challenging,
          especially when living abroad. Our platform is designed to connect
          Iranians outside Iran—especially those in Europe—with Farsi-speaking
          doctors, making healthcare more accessible and personalized.
        </Typography>
        <Typography variant="body1" paragraph>
          We understand the importance of clear communication in medical care.
          Whether you need a general practitioner, specialist, or therapist, our
          platform helps you find professionals who understand both your
          language and cultural background.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to bridge the gap between Iranian communities and
          quality healthcare services, ensuring that language is never a barrier
          to your well-being.
        </Typography>
        <Box
          sx={{
            position: "absolute",

            bottom: 16,
            right: 16,
            display: "flex",
            gap: 1,
          }}
        >
          <Twitter sx={{ cursor: "pointer" }} color="primary" />
          <Instagram sx={{ cursor: "pointer" }} color="secondary" />
        </Box>
      </Paper>
    </Container>
  );
}
