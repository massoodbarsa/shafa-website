import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Success() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user || !user.id) return; // Prevent errors if user is null

    const timeout = setTimeout(() => {
      router.push(`/dashboard/doctor/${user.id}`);
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [router, user]);

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: "12px" }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <CheckCircleIcon sx={{ fontSize: 80, color: "green" }} />
          <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
            Payment Successful!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: "gray" }}>
            Redirecting to your dashboard...
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
