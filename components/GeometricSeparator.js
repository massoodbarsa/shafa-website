"use client";

import React from "react";
import { Box } from "@mui/material";

export default function GeometricSeparator() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: 160,
        height: 12,
        mx: "auto",
        direction: "ltr",
      }}
    >
      {/* Left line */}
      <Box
        sx={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(90deg, rgba(29,19,55,0) 0%, #1D1337 100%)",
          opacity: 0.3,
        }}
      />

      {/* Center diamonds */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: 1.2,
          gap: 0.4,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: 4,
            height: 4,
            bgcolor: "#1D1337",
            transform: "rotate(45deg)",
            opacity: 0.4,
          }}
        />

        <Box
          sx={{
            width: 7,
            height: 7,
            bgcolor: "#1D1337",
            transform: "rotate(45deg)",
            opacity: 0.8,
          }}
        />

        <Box
          sx={{
            width: 4,
            height: 4,
            bgcolor: "#1D1337",
            transform: "rotate(45deg)",
            opacity: 0.4,
          }}
        />
      </Box>

      {/* Right line */}
      <Box
        sx={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(270deg, rgba(29,19,55,0) 0%, #1D1337 100%)",
          opacity: 0.3,
        }}
      />
    </Box>
  );
}
