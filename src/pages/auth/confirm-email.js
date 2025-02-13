import { useEffect } from "react";
import { useRouter } from "next/router";
import { CircularProgress, Container, Typography, Box } from "@mui/material";

export default function EmailConfirmation() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      fetch(`/api/auth/confirm-email?token=${token}`)
        .then((response) => {
          if (response.ok) {
            router.push("/login?verified=true");
          } else {
            router.push("/login?verified=false");
          }
        })
        .catch(() => router.push("/login?verified=false"));
    }
  }, [token]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Verifying your email...
        </Typography>
      </Box>
    </Container>
  );
}
