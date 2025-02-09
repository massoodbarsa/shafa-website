import { supabaseAdmin } from "../../../utils/supabase-admin";

export default async function handler(req, res) {
  const { userId } = req.body;

  try {
    // Delete associated clients first
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

    // Then delete the user
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      throw error;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      error: error.message || "Failed to delete user",
      details: error,
    });
  }
}
