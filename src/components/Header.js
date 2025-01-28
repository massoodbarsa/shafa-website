import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

const mainPages = ["Home", "Doctors", "About", "Contact"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElNav(null);
  };

  const handleAuth = (type) => {
    setIsLoggedIn(type === "login");
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Iranian Doctors Web App
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {mainPages.map((page) => (
                <MenuItem key={page} onClick={handleMenuClose}>
                  {page}
                </MenuItem>
              ))}
              <MenuItem
                onClick={() => handleAuth(isLoggedIn ? "logout" : "login")}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </MenuItem>
              {!isLoggedIn && (
                <MenuItem onClick={() => handleAuth("login")}>
                  Doctor Register
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {mainPages.map((page) => (
              <Button
                key={page}
                color="inherit"
                sx={{ textTransform: "none", fontSize: "1rem" }}
              >
                {page}
              </Button>
            ))}
            {isLoggedIn ? (
              <>
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
                <Button
                  color="inherit"
                  onClick={() => handleAuth("logout")}
                  sx={{ textTransform: "none" }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => handleAuth("login")}
                  sx={{ textTransform: "none" }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ textTransform: "none", borderWidth: 2 }}
                  onClick={() => handleAuth("login")}
                >
                  Doctor Register
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
