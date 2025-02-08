import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Grid,
  Paper,
  Divider,
  Chip,
} from "@mui/material";

import useBreakpointDown from "@/src/hooks/useBreakpointDown.hook";
import { Status } from "@/enums/PackageTypes";

// Define status colors
const statusColors = {
  [Status.ACTIVE]: "success",
  [Status.EXPIRED]: "warning",
  [Status.CANCELLED]: "error",
  [Status.PENDING]: "default",
  [Status.FREE]: "info",
};

const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = Math.abs(end - start);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
  const diffMonths = Math.floor(diffDays / 30); // Approximate months
  const diffYears = Math.floor(diffDays / 365); // Approximate years

  return { diffDays, diffMonths, diffYears };
};

export default function SubscriptionInfoDialog({ open, onClose, user }) {
  const isMobile = useBreakpointDown();

  const [duration] = useState(
    calculateDuration(user.start_date, user.end_date)
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle color="primary">Subscription Information</DialogTitle>
      <DialogContent>
        {user ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  padding: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography variant="body1">
                  <strong>Duration:</strong>{" "}
                  {duration.diffYears > 0
                    ? `${duration.diffYears} years and ${duration.diffMonths} months and ${duration.diffDays} days`
                    : duration.diffMonths > 0
                    ? `${duration.diffMonths} months and ${duration.diffDays} days`
                    : `${duration.diffDays} days`}
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Chip
                    label={user.status}
                    color={statusColors[user.status]}
                    // color="default"
                    variant="filled"
                  />
                </Typography>
                <Typography variant="body1">
                  <strong>Start Date:</strong>{" "}
                  {new Date(user.start_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  <strong>End Date:</strong>{" "}
                  {new Date(user.end_date).toLocaleDateString()}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1">No user found.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
