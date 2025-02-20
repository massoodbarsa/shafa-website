import { useState } from "react";
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
  Box,
} from "@mui/material";
import {
  Event as EventIcon,
  CalendarToday as CalendarIcon,
  CardMembership as MembershipIcon,
} from "@mui/icons-material";
import useBreakpointDown from "@/src/hooks/useBreakpointDown.hook";
import { Status, PackageTypes } from "@/src/enums/PackageTypes";

const statusColors = {
  [Status.ACTIVE]: "success",
  [Status.EXPIRED]: "warning",
  [Status.CANCELLED]: "error",
  [Status.PENDING]: "default",
  [Status.FREE]: "info",
};

const packageColors = {
  [PackageTypes.BRONZE]: "#CD7F32", // Bronze
  [PackageTypes.SILVER]: "#C0C0C0", // Silver
  [PackageTypes.GOLD]: "#FFD700", // Gold
};

const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = Math.abs(end - start);
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Calculate total months (approximate, using 30.44 days per month average)
  const totalMonths = Math.floor(totalDays / 30.44);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const days = Math.round(totalDays - totalMonths * 30.44);

  // Return appropriate format based on duration
  if (totalMonths >= 12) {
    return { years, months, days: 0, totalDays }; // Days not shown for >12 months
  } else if (totalMonths >= 1) {
    return { years: 0, months: totalMonths, days, totalDays }; // Months and days
  } else {
    return { years: 0, months: 0, days: totalDays, totalDays }; // Days only
  }
};

// Format package name
const formatPackageName = (packageId) => {
  if (!packageId) return "None";
  return packageId.charAt(0).toUpperCase() + packageId.slice(1).toLowerCase();
};

export default function SubscriptionInfoDialog({ open, onClose, user }) {
  const isMobile = useBreakpointDown();
  const [duration] = useState(
    user
      ? calculateDuration(user.start_date, user.end_date)
      : { years: 0, months: 0, days: 0, totalDays: 0 }
  );

  // Format duration string based on calculated values
  const formatDuration = () => {
    const { years, months, days } = duration;

    if (years > 0) {
      const yearText = `${years} year${years > 1 ? "s" : ""}`;
      const monthText =
        months > 0 ? ` ${months} month${months > 1 ? "s" : ""}` : "";
      return yearText + monthText;
    } else if (months > 0) {
      const monthText = `${months} month${months > 1 ? "s" : ""}`;
      const dayText = days > 0 ? ` ${days} day${days > 1 ? "s" : ""}` : "";
      return monthText + dayText;
    } else {
      return `${days} day${days > 1 ? "s" : ""}`;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      sx={{ "& .MuiDialog-paper": { borderRadius: 2 } }}
    >
      <DialogTitle color="primary">Subscription Information</DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        {user ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  bgcolor: "#fafafa",
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Box display="flex" flexDirection="column" gap={2}>
                  {/* Package Type */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <MembershipIcon sx={{ color: "text.secondary" }} />
                    <Typography variant="body1">
                      <strong>Package:</strong>{" "}
                      <Chip
                        label={formatPackageName(user.last_package)}
                        sx={{
                          bgcolor:
                            packageColors[user.last_package] || "grey.300",
                          color: user.last_package ? "white" : "text.primary",
                          fontWeight: "bold",
                        }}
                      />
                    </Typography>
                  </Box>

                  {/* Duration */}
                  {user.status !== Status.FREE && (
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarIcon sx={{ color: "text.secondary" }} />
                      <Typography variant="body1">
                        <strong>Duration:</strong> {formatDuration()}
                      </Typography>
                    </Box>
                  )}

                  <Divider sx={{ my: 2 }} />

                  {/* Status */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <EventIcon sx={{ color: "text.secondary" }} />
                    <Typography variant="body1">
                      <strong>Status:</strong>{" "}
                      <Chip
                        label={user.status}
                        color={statusColors[user.status]}
                        variant="filled"
                        sx={{ fontWeight: "bold" }}
                      />
                    </Typography>
                  </Box>

                  {/* Start Date */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <CalendarIcon sx={{ color: "text.secondary" }} />
                    <Typography variant="body1">
                      <strong>Start Date:</strong>{" "}
                      {new Date(user.start_date).toLocaleDateString()}
                    </Typography>
                  </Box>

                  {/* End Date */}
                  {user.status !== Status.FREE && (
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarIcon sx={{ color: "text.secondary" }} />
                      <Typography variant="body1">
                        <strong>End Date:</strong>{" "}
                        {new Date(user.end_date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{ p: 2 }}>
            No subscription information available.
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          sx={{ borderRadius: 1, px: 4 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
