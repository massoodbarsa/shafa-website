import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import useAuthStore from "../store/authStore";

const DeleteProfileButton = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();
  const { enqueueSnackbar } = useSnackbar(); // Initialize notistack

  const handleDeleteProfile = async () => {
    setLoading(true);

    try {
      // 1. Delete profile image from storage
      if (user.profile_image) {
        const fileName = user.profile_image.split("/").pop();
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

      // 3. Delete auth user via API
      const response = await fetch("/api/delete-user/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete auth user");
      }

      // 4. Sign out and redirect
      await supabase.auth.signOut();
      logout();
      enqueueSnackbar("Profile deleted successfully.", { variant: "success" });
      router.push("/register");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      console.error("Error deleting profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <LoadingButton
        variant="contained"
        color="secondary"
        onClick={handleDeleteProfile}
        loading={loading}
      >
        Delete Profile
      </LoadingButton>
    </Box>
  );
};

export default DeleteProfileButton;
