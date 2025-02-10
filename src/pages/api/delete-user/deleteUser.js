import { UserRole } from "@/enums/UserRole";
import { supabaseAdmin } from "../../../utils/supabase-admin";

export default async function handler(req, res) {
  const { userId, role } = req.body;

  // Ensure both userId and role are provided
  if (!userId || !role) {
    return res.status(400).json({ error: "User ID and role are required" });
  }

  try {
    // Delete associated clients if the role is "user"
    if (role === UserRole.Client) {
      const { error: deleteClientsError } = await supabaseAdmin
        .from("clients")
        .delete()
        .eq("user_id", userId);

      if (deleteClientsError) {
        console.error("Error deleting clients:", deleteClientsError);
        return res.status(500).json({
          error: deleteClientsError.message || "Failed to delete clients",
        });
      }
    }

    // Delete associated doctor if the role is "doctor"
    if (role === UserRole.Doctor) {
      const { data: doctorData, error: doctorError } = await supabaseAdmin
        .from("doctors")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (doctorData) {
        const { error: deleteDoctorsError } = await supabaseAdmin
          .from("doctors")
          .delete()
          .eq("user_id", userId);

        if (deleteDoctorsError) {
          console.error("Error deleting doctor:", deleteDoctorsError);
          return res.status(500).json({
            error: deleteDoctorsError.message || "Failed to delete doctor",
          });
        }
      }
    }

    // Then delete the user from auth
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      console.error("Error deleting user:", error);
      throw error; // rethrow error for the catch block to handle
    }

    // Return success response
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      error: error.message || "Failed to delete user",
      details: error,
    });
  }
}
