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
} from "@mui/material";
import useBreakpointDown from "@/src/hooks/useBreakpointDown.hook";
import { loadStripe } from "@stripe/stripe-js";
import { PackageTypes, Status } from "@/enums/PackageTypes";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const packages = [
  { id: PackageTypes.ONE_MONTH, label: "1 Month", price: "$10" },
  { id: PackageTypes.THREE_MONTHS, label: "3 Months", price: "$25" },
  { id: PackageTypes.ONE_YEAR, label: "1 Year", price: "$90" },
];

const UpgradeProfileDialog = ({ open, onClose, user }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);

  const isMobile = useBreakpointDown();

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

      const { sessionId } = await res.json();

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
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
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle color="primary">Select a Package </DialogTitle>
      <DialogContent sx={{ p: 5 }}>
        {user.status === Status.ACTIVE && (
          <Typography variant="body2" color="warning">
            Your status is still active, the duration will be added to your
            subscription
          </Typography>
        )}
        <Grid container spacing={2} my={5}>
          {packages.map((pkg) => (
            <Grid item xs={12} sm={4} key={pkg.id}>
              <Card
                sx={{
                  border:
                    selectedPackage === pkg.id
                      ? "2px solid #1976d2"
                      : "2px solid transparent",
                  borderRadius: "10px",
                  transition: "0.3s",
                }}
              >
                <CardActionArea onClick={() => setSelectedPackage(pkg.id)}>
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {pkg.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      align="center"
                      color="textSecondary"
                    >
                      {pkg.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          disabled={!selectedPackage}
        >
          {loading ? "Processing..." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpgradeProfileDialog;
