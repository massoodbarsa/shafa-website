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
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "../store/authStore";
import { UserRole } from "@/src/enums/UserRole";
import useBreakpointDown from "../hooks/useBreakpointDown.hook";
import { useSnackbar } from "notistack";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const isMobile = useBreakpointDown();
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuthStore();
  const { enqueueSnackbar } = useSnackbar(); // Initialize notistack

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (!user && userData && userData !== "undefined" && userData !== "null") {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && typeof parsedUser === "object") {
          useAuthStore.getState().setUser(parsedUser);
        }
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
      }
    }
  }, [user]);

  const handleMenuOpen = (event) => setAnchorElNav(event.currentTarget);
  const handleMenuClose = () => setAnchorElNav(null);
  const handleLogout = () => {
    logout();
    enqueueSnackbar("Your are logged out.", {
      variant: "info",
    });
    router.push("/login");
  };

  const getProfilePath = () =>
    user.role === UserRole.Doctor
      ? `/dashboard/doctor/${user.id}`
      : "/dashboard/admin";

  const mainPages = [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "/list" },
    { name: "About", path: "/about/aboutUs" },
    { name: "Contact", path: "/contact/contactUs" },
  ];

  const renderMenuItems = () => {
    const items = [
      ...mainPages.map(({ name, path }) => (
        <MenuItem
          key={path}
          component={Link}
          href={path}
          onClick={handleMenuClose}
        >
          {name}
        </MenuItem>
      )),
    ];

    if (isLoggedIn()) {
      items.push(
        user.role === UserRole.Doctor && (
          <MenuItem
            key="profile"
            component={Link}
            href={getProfilePath()}
            onClick={handleMenuClose}
            sx={{ color: "#EB6C08 " }}
          >
            MyProfile
          </MenuItem>
        ),
        user.role === UserRole.Admin && (
          <MenuItem
            key="profile"
            component={Link}
            href={getProfilePath()}
            onClick={handleMenuClose}
            sx={{ color: "#EB6C08 " }}
          >
            Admin
          </MenuItem>
        ),
        <MenuItem key="logout" onClick={handleLogout}>
          Logout
        </MenuItem>
      );
    } else {
      items.push(
        <MenuItem key="login" component={Link} href="/login">
          Login
        </MenuItem>,
        <MenuItem key="signup" component={Link} href="/register">
          SignUp
        </MenuItem>
      );
    }

    return items;
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Avatar alt="Remy Sharp" src="/logo.png" sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Iranian Doctors Hub
        </Typography>

        {isMobile ? (
          <Box>
            <IconButton size="large" color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {renderMenuItems()}
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {mainPages.map(({ name, path }) => (
              <Button
                key={path}
                component={Link}
                href={path}
                color="inherit"
                sx={{
                  textTransform: "none",
                  fontSize: "1rem",
                  borderBottom: pathname === path ? "2px solid white" : "none",
                }}
              >
                {name}
              </Button>
            ))}
            {isLoggedIn() ? (
              <>
                {user.role === UserRole.Doctor && (
                  <Button
                    component={Link}
                    href={getProfilePath()}
                    variant="text"
                    color="warning"
                  >
                    MyProfile
                  </Button>
                )}
                {user.role === UserRole.Admin && (
                  <Button
                    component={Link}
                    href={getProfilePath()}
                    variant="text"
                    color="warning"
                  >
                    Admin
                  </Button>
                )}
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
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
