"use client";

import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function HowICanHelp() {
  const { texts } = useLanguage();

  const helpItems = [
    { title: texts.howItems.whatIs, desc: texts.howItems.whatIsDesc },
    { title: texts.howItems.services, desc: texts.howItems.servicesDesc },
    { title: texts.howItems.innerChild, desc: texts.howItems.innerChildDesc },
    { title: texts.howItems.meditations, desc: texts.howItems.meditationsDesc },
    { title: texts.howItems.workshops, desc: texts.howItems.workshopsDesc },
    { title: texts.howItems.booking, desc: texts.howItems.bookingDesc },
    {
      title: texts.howItems.certificates,
      desc: texts.howItems.certificatesDesc,
    },
    { title: texts.howItems.contact, desc: texts.howItems.contactDesc },
  ];

  return (
    <Box sx={{ py: 10, bgcolor: "white" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          color="primary"
          fontWeight={700}
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          {texts.howTitle}
        </Typography>

        <Grid container spacing={3}>
          {helpItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  textAlign: "center",
                  border: "1px solid #e8d5f2",
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(107,45,139,0.15)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  color="primary"
                  fontWeight={600}
                  gutterBottom
                >
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
