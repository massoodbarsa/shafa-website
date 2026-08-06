"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#583E93", // Exact requested primary deep purple
      light: "#9D6BD9", // Exact requested primary light purple
      dark: "#36306F", // Exact requested primary dark purple
    },
    secondary: {
      main: "#C99745", // Exact requested secondary gold
      light: "#E9C59A", // Exact requested secondary light gold
      dark: "#B17D47", // Exact requested secondary dark gold
    },
    background: {
      default: "#120B24", // Deep background canvas purple matching layout
      paper: "#1D1337", // Inner card purple container blocks
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#E9C59A",
    },
  },
  typography: {
    // Integrates Noto Naskh Arabic as the primary font family handler
    fontFamily:
      '"Noto Naskh Arabic", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 300,
      letterSpacing: "0.15em",
    },
    h2: {
      fontWeight: 400,
      letterSpacing: "0.1em",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
      letterSpacing: "0.05em",
    },
  },
  shape: {
    borderRadius: 16, // Clean rounded card vectors matching your landing page frame
  },
});

export default theme;
