import { supabaseAdmin } from "../../../utils/supabase-admin";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { token, newPassword } = req.body;

    console.log("Password reset request received", {
      token: token ? `${token.substring(0, 15)}...` : "missing",
      newPassword: newPassword ? "******" : "missing",
    });

    if (!token || !newPassword) {
      throw new Error("Missing token or newPassword");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    if (!decoded?.email) {
      throw new Error("Invalid token: missing email");
    }

    const userEmail = decoded.email;
    console.log("Searching for user with email:", userEmail);

    const { data: users, error: fetchError } =
      await supabaseAdmin.auth.admin.listUsers();
    if (fetchError) {
      console.error("Error fetching users:", fetchError);
      throw new Error(`Failed to fetch user data: ${fetchError.message}`);
    }

    console.log("Total users fetched:", users.users.length);
    console.log(
      "User emails in Supabase:",
      users.users.map((u) => u.email)
    );

    const user = users?.users.find((u) => u.email === userEmail);
    if (!user) {
      console.error("User not found for email:", userEmail);
      throw new Error("User not found");
    }

    const userId = user.id;
    console.log("User found with ID:", userId);

    const { error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: newPassword,
      });

    if (updateError) {
      console.error("supabaseAdmin update error:", updateError);
      throw new Error(`Password update failed: ${updateError.message}`);
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
    } else if (error.message.includes("User not found")) {
      errorMessage = "User not found";
    } else if (error.message.includes("Missing")) {
      errorMessage = "Missing required fields";
    } else if (error.message.includes("fetch user data")) {
      errorMessage = "Failed to retrieve users from Supabase";
    } else if (error.message.includes("Password update failed")) {
      errorMessage = "Failed to update password";
    }

    res.status(400).json({
      error: errorMessage,
      details: error.message,
    });
  }
}
