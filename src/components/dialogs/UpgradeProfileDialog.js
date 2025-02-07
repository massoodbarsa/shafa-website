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
  Box,
} from "@mui/material";

const packages = [
  { id: "1month", label: "1 Month", price: "$10" },
  { id: "3months", label: "3 Months", price: "$25" },
  { id: "1year", label: "1 Year", price: "$90" },
];

const UpgradeProfileDialog = ({ open, onClose }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Select a Package</DialogTitle>
      <DialogContent sx={{ p: 5 }}>
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
          onClick={() => onConfirm(selectedPackage)}
          color="primary"
          variant="contained"
          disabled={!selectedPackage}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpgradeProfileDialog;
