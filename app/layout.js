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
      <body>
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
