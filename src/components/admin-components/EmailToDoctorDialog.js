import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";

const EmailToDoctorDialog = ({ open, emailTo, onClose, emailToFullname }) => {
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar(); // Initialize notistack

  const handleEmailSubmit = async () => {
    setLoading(true);
    if (!emailSubject || !emailBody) {
      enqueueSnackbar("Both subject and body must be filled out.", {
        variant: "warning",
      });

      setLoading(false);

      return;
    }

    try {
      const response = await fetch("/api/auth/admin-doctor-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: emailToFullname,
          email: emailTo,
          subject: emailSubject,
          message: emailBody,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setEmailBody("");
        setEmailSubject("");
        enqueueSnackbar("Email sent.", {
          variant: "success",
        });
        setLoading(false);
      } else {
        enqueueSnackbar(error, {
          variant: "success",
        });
      }

      onClose(true); // Close dialog after sending email
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Send Email to {emailTo}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3} sx={{ p: 3 }}>
          <TextField
            label="Subject"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)} // Use setter to update subject
            fullWidth
            required
          />
          <TextField
            label="Body"
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)} // Use setter to update body
            fullWidth
            multiline
            rows={4}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, mb: 2 }}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleEmailSubmit}
          color="secondary"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Email"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailToDoctorDialog;
