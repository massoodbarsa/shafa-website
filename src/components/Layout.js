import React from "react";
import { Box, Toolbar, Container } from "@mui/material";
import Header from "./Header"; // Your custom header component
import Footer from "./Footer"; // Your custom footer component
import Image from "next/image";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header /> {/* Include the header */}
      <Toolbar /> {/* Add a toolbar to account for the AppBar height */}
      <Container component="main" sx={{ flexGrow: 1, py: 4 }} maxWidth="xl">
        {children} {/* Render the page content */}
      </Container>
      <Footer /> {/* Include the footer */}
    </Box>
  );
};

export default Layout;
