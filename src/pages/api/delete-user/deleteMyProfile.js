import { supabaseAdmin } from "../../../utils/supabase-admin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId } = req.body;

  if (!userId) {
    console.log("No userId provided in request body"); // Debug log
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    console.log("Attempting to delete user with ID:", userId); // Debug log

    // Optional: Check if user exists first
    const { data: userData, error: fetchError } =
      await supabaseAdmin.auth.admin.getUserById(userId);
    if (fetchError || !userData) {
      console.error(
        "Error fetching user or user not found:",
        fetchError || "No user data"
      );
      throw new Error("User not found in auth");
    }
    console.log("User exists in auth:", userData.user); // Debug log

    // Delete the auth user
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      userId
    );
    if (deleteError) {
      console.error("Supabase Auth delete error:", deleteError); // Debug log
      throw deleteError; // Throw the raw Supabase error
    }

    console.log("User deleted successfully from auth"); // Debug log
    res.status(200).json({ success: true, message: "User deleted from auth" });
  } catch (error) {
    console.error("Delete user error:", error); // Debug log
    res.status(500).json({
      error: error.message || "Failed to delete user from auth",
      details: error.details || {},
    });
  }
}
