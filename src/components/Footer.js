import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        backgroundColor: "primary.main",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="body1">© 2025 Iranian Doctors Hub</Typography>
    </Box>
  );
};

export default Footer;
