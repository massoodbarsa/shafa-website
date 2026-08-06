import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme/theme";
import { LanguageProvider } from "../context/LanguageContext";
import "./globals.css";

export const metadata = {
  title: "SHAFA Hypnotherapy & Wellness",
  description: "Healing begins within.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Connection link nodes for Google Fonts: Noto Naskh Arabic */}
        <link rel="preconnect" href="https://googleapis.com" />
        <link
          rel="preconnect"
          href="https://gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, backgroundColor: "#120B24" }}>
        <LanguageProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
