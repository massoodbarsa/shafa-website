import { supabaseAdmin } from "../../../utils/supabase-admin";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { token, newPassword } = req.body;

    // Log incoming request (mask sensitive info)
    console.log("Password reset request received", {
      token: token ? `${token.substring(0, 15)}...` : "missing",
      newPassword: newPassword ? "******" : "missing",
    });

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    if (!decoded?.email) {
      throw new Error("Invalid token: missing email");
    }

    const userEmail = decoded.email;
    console.log("Searching for user with email:", userEmail);

    // Fetch the user ID from supabaseAdmin
    const { data: users, error: fetchError } =
      await supabaseAdmin.auth.admin.listUsers();

    if (fetchError) {
      console.error("Error fetching users:", fetchError);
      throw new Error("Failed to fetch user data");
    }

    const user = users?.users.find((u) => u.email === userEmail);
    if (!user) {
      throw new Error("User not found");
    }

    const userId = user.id;
    console.log("User found with ID:", userId);

    // Update password using admin API
    const { error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: newPassword,
      });

    if (updateError) {
      console.error("supabaseAdmin update error:", updateError);
      throw updateError;
    }

    console.log("Password updated successfully for user ID:", userId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Password reset error:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    let errorMessage = "Password reset failed";
    if (error.name === "TokenExpiredError") {
      errorMessage = "Reset link has expired";
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "Invalid reset token";
    }

    res.status(400).json({
      error: errorMessage,
      details: error.message,
    });
  }
}
