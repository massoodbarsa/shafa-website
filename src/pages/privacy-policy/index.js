import React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Container sx={{ paddingTop: 4, paddingBottom: 6, maxWidth: "md" }}>
      <Typography variant="h3" gutterBottom align="center">
        Privacy Policy
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        gutterBottom
      >
        Last updated: March 2025
      </Typography>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We collect personal data such as name, email, and reviews to provide
          better services.
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h5" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use your data for authentication, security, and platform
          improvements.
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h5" gutterBottom>
          3. Data Protection
        </Typography>
        <Typography variant="body1" paragraph>
          We use encryption (SSL) and do not share your data with third parties.
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h5" gutterBottom>
          4. Your Rights
        </Typography>
        <Typography variant="body1" paragraph>
          You can request data deletion or access your personal information.
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h5" gutterBottom>
          5. Contact
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions, contact us at{" "}
          <a href="mailto:support@iraniandoctorshub.com">
            iraniandoctorshub@gmail.com
          </a>
          .
        </Typography>
      </Box>
    </Container>
  );
}
