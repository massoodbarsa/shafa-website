import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        p: 3,
        backgroundColor: "primary.main",
        color: "white",
        display: "flex",
        justifyContent: "center", // Center the copyright text
        alignItems: "center",
        px: 3,
        position: "relative",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          left: 0,
          px: 2,
        }}
      >
        <Link href="/privacy-policy" color="inherit" underline="hover">
          Privacy Policy
        </Link>
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        © 2025 Iranian Doctors Hub
      </Typography>
    </Box>
  );
};

export default Footer;
