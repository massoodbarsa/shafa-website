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
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "../store/authStore";
import { formatUserNameForURL } from "../utils/formatUserNameForURL";
import { UserRole } from "@/enums/UserRole";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuthStore();

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
    router.push("/login");
  };

  const getProfilePath = () =>
    user?.first_name && user?.last_name
      ? `/dashboard/doctor/${formatUserNameForURL(
          user.first_name,
          user.last_name
        )}`
      : "/doctor";

  const renderMenuItems = () => (
    <>
      {mainPages.map(({ name, path }) => (
        <MenuItem
          key={path}
          component={Link}
          href={path}
          onClick={handleMenuClose}
        >
          {name}
        </MenuItem>
      ))}
      {isLoggedIn() ? (
        <>
          <MenuItem
            component={Link}
            href={getProfilePath()}
            onClick={handleMenuClose}
          >
            MyProfile
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </>
      ) : (
        <>
          <MenuItem component={Link} href="/login">
            Login
          </MenuItem>
          <MenuItem component={Link} href="/register">
            SignUp
          </MenuItem>
        </>
      )}
    </>
  );

  const mainPages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Iranian Doctors Web App
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
