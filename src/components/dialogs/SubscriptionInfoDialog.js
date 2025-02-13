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
import { Status } from "@/src/enums/PackageTypes";

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

  // Calculate years and months
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  // Adjust if days are negative (crossing month boundary)
  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }

  // Adjust if months are negative (crossing year boundary)
  if (months < 0) {
    years--;
    months += 12;
  }

  // Ensure days are non-negative
  if (days < 0) days = 0;

  return { diffDays, years, months, days };
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
                {user.status !== Status.FREE && (
                  <Typography variant="body1">
                    <strong>Duration:</strong>{" "}
                    {duration.years > 0
                      ? `${duration.years} year${duration.years > 1 ? "s" : ""}`
                      : duration.months > 0
                      ? `${duration.months} month${
                          duration.months > 1 ? "s" : ""
                        }`
                      : `${duration.days} day${duration.days > 1 ? "s" : ""}`}
                  </Typography>
                )}

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
                {user.status !== Status.FREE && (
                  <Typography variant="body1">
                    <strong>End Date:</strong>{" "}
                    {new Date(user.end_date).toLocaleDateString()}
                  </Typography>
                )}
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
