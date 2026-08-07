"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import LayoutWrapper from "@/components/LayoutWrapper";
import DashboardGrid from "@/components/DashboardGrid";

export default function HomeDashboardPage() {
  const params = useParams(); // Reads the URL language string parameter segment instantly
  const { changeLanguage } = useLanguage();

  useEffect(() => {
    // Keeps context memory synchronized cleanly with the active URL address bar path string
    if (params.lang === "en" || params.lang === "fa") {
      changeLanguage(params.lang);
    }
  }, [params.lang, changeLanguage]);

  return (
    <LayoutWrapper>
      {/* Renders your 4x2 desktop / 2-column mobile matrix grid inside the shared frame wrapper context */}
      <DashboardGrid />
    </LayoutWrapper>
  );
}
