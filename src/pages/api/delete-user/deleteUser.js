import { UserRole } from "@/src/enums/UserRole";
import { supabaseAdmin } from "../../../utils/supabase-admin";

export default async function handler(req, res) {
  const { userId, role } = req.body;

  if (!userId || !role) {
    return res.status(400).json({ error: "User ID and role are required" });
  }

  try {
    if (role === UserRole.Client) {
      // First get client IDs associated with the user
      const { data: clients, error: fetchClientsError } = await supabaseAdmin
        .from("clients")
        .select("id")
        .eq("user_id", userId);

      if (fetchClientsError) {
        console.error("Error fetching clients:", fetchClientsError);
        return res.status(500).json({
          error: fetchClientsError.message || "Failed to fetch clients",
        });
      }

      // Delete associated reviews if any clients found
      if (clients && clients.length > 0) {
        const clientIds = clients.map((client) => client.id);
        const { error: deleteReviewsError } = await supabaseAdmin
          .from("reviews")
          .delete()
          .in("client_id", clientIds);

        if (deleteReviewsError) {
          console.error("Error deleting client reviews:", deleteReviewsError);
          return res.status(500).json({
            error:
              deleteReviewsError.message || "Failed to delete client reviews",
          });
        }
      }

      // Delete the clients
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

    if (role === UserRole.Doctor) {
      // First get the doctor data
      const { data: doctorData, error: doctorError } = await supabaseAdmin
        .from("doctors")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (doctorError) {
        console.error("Error fetching doctor:", doctorError);
        return res.status(500).json({
          error: doctorError.message || "Failed to fetch doctor",
        });
      }

      if (doctorData) {
        // Delete associated reviews
        const { error: deleteReviewsError } = await supabaseAdmin
          .from("reviews")
          .delete()
          .eq("doctor_id", doctorData.id);

        if (deleteReviewsError) {
          console.error("Error deleting doctor reviews:", deleteReviewsError);
          return res.status(500).json({
            error:
              deleteReviewsError.message || "Failed to delete doctor reviews",
          });
        }

        // Delete the doctor
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

    // Finally delete the user from auth
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) throw error;

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      error: error.message || "Failed to delete user",
      details: error,
    });
  }
}
