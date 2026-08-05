"use client";

import { Box } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import HowICanHelp from "@/components/HowICanHelp";

export default function Home() {
  const { texts } = useLanguage();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Navbar />

      <Hero />

      <Welcome />

      <HowICanHelp />
    </Box>
  );
}
