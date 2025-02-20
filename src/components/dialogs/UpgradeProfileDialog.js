import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import useBreakpointDown from "@/src/hooks/useBreakpointDown.hook";
import { loadStripe } from "@stripe/stripe-js";
import { PackageTypes, Status } from "@/src/enums/PackageTypes";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const packages = [
  {
    id: PackageTypes.BRONZE,
    label: "Bronze",
    duration: "3 Months",
    price: "$25",
    isFeatured: false,
    features: ["Basic profile listing", "Access to messaging system"],
    color: "#CD7F32",
  },
  {
    id: PackageTypes.SILVER,
    label: "Silver",
    duration: "6 Months",
    price: "$50",
    isFeatured: false,
    features: [
      "Basic profile listing",
      "Access to messaging system",
      "Priority support",
    ],
    color: "#C0C0C0",
  },
  {
    id: PackageTypes.GOLD,
    label: "Gold",
    duration: "1 Year",
    price: "$90",
    isFeatured: true,
    features: [
      "Featured on homepage for your location",
      "Profile accessible without login",
      "Basic profile listing",
      "Access to messaging system",
      "Priority support",
    ],
    color: "#FFD700",
  },
];

const UpgradeProfileDialog = ({ open, onClose, user }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);

  const isMobile = useBreakpointDown();

  // Determine the user's current package
  const currentPackage = user?.last_package || null;

  // Logic to determine if a package is disabled
  const isPackageDisabled = (pkgId) => {
    if (!currentPackage || user.status !== Status.ACTIVE) return false; // All options available if no active package
    if (currentPackage === PackageTypes.GOLD)
      return pkgId !== PackageTypes.GOLD; // Only Gold enabled for extension
    if (currentPackage === PackageTypes.SILVER)
      return pkgId !== PackageTypes.GOLD; // Only Gold enabled
    if (currentPackage === PackageTypes.BRONZE)
      return pkgId === PackageTypes.BRONZE; // Silver and Gold enabled, Bronze disabled
    return false;
  };

  // Custom message based on current package
  const getMessage = () => {
    if (!currentPackage || user.status !== Status.ACTIVE) {
      return "Choose a package to get started.";
    }
    if (currentPackage === PackageTypes.GOLD) {
      return "You’re already on the Gold plan, the highest tier. Extend your subscription by selecting Gold again.";
    }
    if (currentPackage === PackageTypes.SILVER) {
      return "You’re on the Silver plan. Upgrade to Gold for premium features.";
    }
    if (currentPackage === PackageTypes.BRONZE) {
      return "You’re on the Bronze plan. Upgrade to Silver or Gold for more features.";
    }
  };

  const handleConfirm = async () => {
    if (!selectedPackage) return;

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          packageId: selectedPackage,
          currency: "eur",
        }),
      });

      if (!res.ok) {
        throw new Error(`API request failed: ${res.status}`);
      }

      const { sessionId } = await res.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(`Stripe redirect error: ${error.message}`);
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle color="primary">Select a Package</DialogTitle>
      <DialogContent sx={{ p: 5 }}>
        <Typography variant="body2" color="textSecondary" mb={2}>
          {getMessage()}
        </Typography>
        {user.status === Status.ACTIVE && (
          <Typography variant="body2" color="warning.main" mb={2}>
            Your current subscription is active; the new duration will be added
            to your existing plan.
          </Typography>
        )}
        <Grid container spacing={2} my={5}>
          {packages.map((pkg) => {
            const isDisabled = isPackageDisabled(pkg.id);
            return (
              <Grid item xs={12} sm={4} key={pkg.id}>
                <Card
                  sx={{
                    border:
                      selectedPackage === pkg.id
                        ? "2px solid #1976d2"
                        : `2px solid ${pkg.color}`,
                    borderRadius: "10px",
                    transition: "0.3s",
                    backgroundColor:
                      pkg.isFeatured && selectedPackage !== pkg.id
                        ? "#FFF8E1"
                        : "white",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    opacity: isDisabled ? 0.5 : 1, // Dim disabled cards
                  }}
                >
                  <CardActionArea
                    onClick={() => !isDisabled && setSelectedPackage(pkg.id)}
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                    disabled={isDisabled}
                  >
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h6">{pkg.label}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {pkg.duration}
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                          {pkg.price}
                        </Typography>
                        {pkg.isFeatured && (
                          <Typography variant="caption" color="primary" mt={1}>
                            ⭐ Featured Plan
                          </Typography>
                        )}
                      </Box>
                      <List dense sx={{ mt: 2, flexGrow: 1 }}>
                        {pkg.features.map((feature, index) => (
                          <ListItem key={index} disableGutters>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{
                                variant: "body2",
                                color: "textSecondary",
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          disabled={!selectedPackage || loading}
        >
          {loading ? "Processing..." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpgradeProfileDialog;
