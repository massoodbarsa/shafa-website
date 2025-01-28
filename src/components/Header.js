"use client";

import { useState } from "react";
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
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainPages = [
  { name: "Home", path: "/" },
  { name: "Doctor", path: "/doctor" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();

  const handleMenuOpen = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
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
                <MenuItem
                  key={page.path}
                  component={Link}
                  href={page.path}
                  onClick={handleMenuClose}
                  selected={pathname === page.path}
                >
                  {page.name}
                </MenuItem>
              ))}
              {!isLoggedIn && (
                <MenuItem
                  component={Link}
                  href="/doctor/register"
                  onClick={handleMenuClose}
                  selected={pathname === "/doctor/register"}
                >
                  Doctor Register
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {mainPages.map((page) => (
              <Button
                key={page.path}
                component={Link}
                href={page.path}
                color="inherit"
                sx={{
                  textTransform: "none",
                  fontSize: "1rem",
                  borderBottom:
                    pathname === page.path ? "2px solid white" : "none",
                }}
              >
                {page.name}
              </Button>
            ))}
            {!isLoggedIn && (
              <>
                <Button
                  color="inherit"
                  href="/login"
                  sx={{ textTransform: "none" }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  href="/doctor/register"
                  variant="outlined"
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    borderWidth: 2,
                    "&:hover": { borderWidth: 2 },
                  }}
                >
                  SignUp
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
