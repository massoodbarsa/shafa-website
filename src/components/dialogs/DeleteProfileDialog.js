import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";
import useAuthStore from "../../store/authStore";
import useBreakpointDown from "../../hooks/useBreakpointDown.hook";

const DeleteProfileDialog = ({ user, open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useBreakpointDown();

  console.log(user);

  const handleDeleteProfile = async () => {
    setLoading(true);

    try {
      // 1. Delete profile image from storage
      if (user.profile_image) {
        const fileName = user.profile_image.split("/").slice(7).join("/");
        const { error: deleteImageError } = await supabase.storage
          .from("profile_pictures")
          .remove([`doctors/${fileName}`]);

        if (deleteImageError) throw deleteImageError;
      }

      // 2. Delete doctor profile from database
      const { error: deleteProfileError } = await supabase
        .from("doctors")
        .delete()
        .eq("id", user.id);

      if (deleteProfileError) throw deleteProfileError;

      console.log(deleteProfileError);

      console.log(user.id);

      // 3. Delete auth user via API
      const response = await fetch("/api/delete-user/deleteMyProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.user_id }), // Pass user.id in the body
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete auth user");
      }

      // 4. Sign out and redirect
      await supabase.auth.signOut();

      onClose(true);
      logout();
      enqueueSnackbar("Profile deleted successfully.", { variant: "success" });
      router.push("/register");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      onClose(true);
      console.error("Error deleting profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile} fullWidth>
      <DialogTitle color="primary">Confirm Deletion</DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <DialogContentText>
          Are you sure you want to delete your profile? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleDeleteProfile}
          color="error"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProfileDialog;
