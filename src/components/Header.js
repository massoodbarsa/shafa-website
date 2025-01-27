import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">Iranian Doctors Web App</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
