import { supabaseAdmin } from "../../../utils/supabase-admin";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(req, res) {
  const supabase = createServerSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Corrected method chain
    const { error } = await supabaseAdmin.auth.admin.deleteUser(
      session.user.id
    );

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
