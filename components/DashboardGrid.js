"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";
import DashboardCard from "./DashboardCard";

import PsychologyIcon from "@mui/icons-material/Psychology";
import PersonIcon from "@mui/icons-material/Person";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import HealingIcon from "@mui/icons-material/Healing";
import SchoolIcon from "@mui/icons-material/School";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AnimationIcon from "@mui/icons-material/Animation";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import InfoIcon from "@mui/icons-material/Info";

export default function DashboardGrid() {
  const { texts, lang } = useLanguage();
  const router = useRouter();

  const icons = [
    <PsychologyIcon sx={{ fontSize: "2.5rem" }} />,
    <WorkspacePremiumIcon sx={{ fontSize: "2.5rem" }} />,
    <SelfImprovementIcon sx={{ fontSize: "2.5rem" }} />,
    <ChildCareIcon sx={{ fontSize: "2.5rem" }} />,
    <DesignServicesIcon sx={{ fontSize: "2.5rem" }} />,

    <SchoolIcon sx={{ fontSize: "2.5rem" }} />,
    <AnimationIcon sx={{ fontSize: "2.5rem" }} />,
    <InfoIcon sx={{ fontSize: "2.5rem" }} />,
  ];

  const routes = [
    "hypnotherapy",
    "about",
    "certificates",
    "meditation",
    "inner-child",
    "services",
    "workshops",
    "self-hypnosis",
  ];

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      {/* DYNAMIC SALUTATION HEADER BLOCK */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 400,
            fontFamily: lang === "fa" ? '"Noto Naskh Arabic", serif' : "serif",
            color: "primary.main",
            mb: 1.5,
            fontSize: { xs: "1.6rem", md: "2.4rem" },
          }}
        >
          {texts.homeDashboard.greeting}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "primary.light",
            fontWeight: 300,
            fontSize: { xs: "0.85rem", md: "1.05rem" },
            fontFamily:
              lang === "fa" ? '"Noto Naskh Arabic", sans-serif' : "inherit",
          }}
        >
          {texts.homeDashboard.subGreeting}
        </Typography>
      </Box>

      {/* FIXED CONTAINER: Added width 100% to fill out our expanded LayoutWrapper space safely */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 2, md: 3 }, // FIXED: 2 unit gaps on mobile screens prevents overflowing or squishing
          width: "100%",
          justifyContent: "center",
          direction: lang === "fa" ? "rtl" : "ltr",
        }}
      >
        {texts.homeDashboard.cards.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            subtitle={card.subtitle || ""}
            icon={icons[index]}
            onClick={() => {
              router.push(`/${lang}/${routes[index]}`);
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
