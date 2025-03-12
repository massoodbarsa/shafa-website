import React from "react";
import { Box, Toolbar, Container } from "@mui/material";
import Header from "./Header"; // Your custom header component
import Footer from "./Footer"; // Your custom footer component

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Toolbar />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }} maxWidth="xl">
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
