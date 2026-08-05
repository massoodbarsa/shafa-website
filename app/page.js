"use client";

import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Grid,
  Paper,
} from "@mui/material";
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

      {/* ===== HERO SECTION ===== */}
      <Hero />
      {/* ===== WELCOME SECTION ===== */}
      <Welcome />

      {/* ===== HOW I CAN HELP YOU ===== */}
      <HowICanHelp />
    </Box>
  );
}
