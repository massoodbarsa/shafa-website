"use client";

import { useState, useEffect } from "react";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation";

const mainPages = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "MyProfile", path: "/doctor" },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();
  const { user, isLoggedIn, logout } = useAuthStore(); // Get user state from store
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user_data");

    // Check if user_data exists and is a non-empty string
    if (!user && userData && userData !== "undefined" && userData !== "null") {
      try {
        // Attempt to parse only if it's a valid string
        const parsedUser = JSON.parse(userData);

        // Ensure parsedUser is a valid object
        if (parsedUser && typeof parsedUser === "object") {
          useAuthStore.getState().setUser(parsedUser);
        }
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
      }
    }
  }, [user]);

  const handleMenuOpen = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    logout(); // Update Zustand store (user is logged out)
    router.push("/login");
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
          <Box>
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
              {isLoggedIn() ? (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Box display="flex" flexDirection="column">
                  <Button color="inherit" href="/login">
                    Login
                  </Button>
                  <Button
                    component={Link}
                    href="/register"
                    variant="outlined"
                    color="inherit"
                  >
                    SignUp
                  </Button>
                </Box>
              )}
            </Menu>
          </Box>
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
            {isLoggedIn() ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="inherit" href="/login">
                  Login
                </Button>
                <Button
                  component={Link}
                  href="/register"
                  variant="outlined"
                  color="inherit"
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
