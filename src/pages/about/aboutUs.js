"use client";

import { useState } from "react";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { Twitter, Instagram } from "@mui/icons-material";
import { NextSeo } from "next-seo";

export default function AboutUs() {
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      title: "About Us",
      paragraph1:
        "Finding a trusted doctor who speaks your language can be challenging, especially when living abroad. Our platform is designed to connect Iranians outside Iran—especially those in Europe—with Farsi-speaking doctors, making healthcare more accessible and personalized.",
      paragraph2:
        "We understand the importance of clear communication in medical care. Whether you need a general practitioner, specialist, or therapist, our platform helps you find professionals who understand both your language and cultural background.",
      paragraph3:
        "Our mission is to bridge the gap between Iranian communities and quality healthcare services, ensuring that language is never a barrier to your well-being.",
      toggleText: "فارسی",
    },
    fa: {
      title: "درباره ما",
      paragraph1:
        "یافتن پزشکی مورد اعتماد که به زبان شما صحبت کند، به‌ویژه در خارج از کشور، می‌تواند چالش‌برانگیز باشد. پلتفرم ما برای ارتباط ایرانیان خارج از ایران—به‌ویژه در اروپا—با پزشکان فارسی‌زبان طراحی شده است تا دسترسی به خدمات درمانی را ساده‌تر و شخصی‌تر کند.",
      paragraph2:
        "ما اهمیت ارتباط واضح در مراقبت‌های پزشکی را درک می‌کنیم. چه به پزشک عمومی نیاز داشته باشید، چه متخصص یا روان‌درمانگر، پلتفرم ما به شما کمک می‌کند تا متخصصانی را پیدا کنید که هم زبان و هم فرهنگ شما را می‌فهمند.",
      paragraph3:
        "ماموریت ما ایجاد پلی میان جوامع ایرانی و خدمات درمانی باکیفیت است تا زبان هرگز مانعی برای سلامتی شما نباشد.",
      toggleText: "English",
    },
  };

  return (
    <>
      <NextSeo
        title="About Us | Farsi-Speaking Doctors"
        description="Our platform connects Iranians outside of Iran with trusted Farsi-speaking doctors, making healthcare more accessible and personalized."
        openGraph={{
          title: "About Us | Farsi-Speaking Doctors",
          description:
            "Our platform connects Iranians outside of Iran with trusted Farsi-speaking doctors, making healthcare more accessible and personalized.",
          url: `${process.env.NEXT_PUBLIC_BASE_UR}/about-us`,
          images: [
            {
              url: "/about-us-image.jpg", // Use an appropriate image for the about us page
              width: 1200,
              height: 630,
              alt: "About Us Image",
            },
          ],
        }}
      />
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            marginTop: 4,
            borderRadius: 2,
            position: "relative",
          }}
        >
          <Box sx={{ position: "absolute", top: 16, right: 16 }}>
            <Button
              onClick={() => setLanguage(language === "en" ? "fa" : "en")}
              variant="outlined"
            >
              {content[language].toggleText}
            </Button>
          </Box>
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" component="h1" gutterBottom>
              {content[language].title}
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {content[language].paragraph1}
          </Typography>
          <Typography variant="body1" paragraph>
            {content[language].paragraph2}
          </Typography>
          <Typography variant="body1" paragraph>
            {content[language].paragraph3}
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
    </>
  );
}
