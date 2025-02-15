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

const EmailToDoctorDialog = ({ open, emailTo, onClose }) => {
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const { enqueueSnackbar } = useSnackbar(); // Initialize notistack

  const handleEmailSubmit = async () => {
    try {
      // Handle email sending logic here, like calling an API for sending emails
      console.log(`Email sent to ${emailTo}:`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Body: ${emailBody}`);

      enqueueSnackbar("Email sent successfully!", { variant: "success" });
      setOpenEmailDialog(false);
    } catch (error) {
      enqueueSnackbar("Error sending email.", { variant: "error" });
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
          />
          <TextField
            label="Body"
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)} // Use setter to update body
            fullWidth
            multiline
            rows={4}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, mb: 2 }}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEmailSubmit} color="secondary">
          Send Email
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailToDoctorDialog;
