import { createClient } from "@supabase/supabase-js";
import { UserRole } from "@/enums/UserRole"; // Ensure this path is correct

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.redirect("/login?error=invalid_token");
  }

  try {
    // 1. Verify token exists
    const { data: verification, error: lookupError } = await supabase
      .from("email_verifications")
      .select("*")
      .eq("token", token)
      .single();

    if (lookupError || !verification) {
      return res.redirect("/login?error=invalid_token");
    }

    // 2. Update Supabase auth user
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      verification.user_id,
      {
        email_confirm: true, // Correct parameter name
        user_metadata: { email_verified: true },
      }
    );

    if (updateError) throw updateError;

    // 3. Determine user type and update correct table
    let table;

    // Check if user exists in doctors table
    const { data: doctor } = await supabase
      .from("doctors")
      .select()
      .eq("user_id", verification.user_id)
      .single();

    // If not found in doctors, check clients
    if (!doctor) {
      const { data: client } = await supabase
        .from("clients")
        .select()
        .eq("user_id", verification.user_id)
        .single();

      if (!client) throw new Error("User not found in any table");
      table = "clients";
    } else {
      table = "doctors";
    }

    // 4. Update email_verified status
    const { error: profileError } = await supabase
      .from(table)
      .update({ email_verified: true })
      .eq("user_id", verification.user_id);

    if (profileError) throw profileError;

    // 5. Cleanup verification token
    await supabase.from("email_verifications").delete().eq("token", token);

    res.redirect("/login?verified=true");
  } catch (error) {
    console.error("Verification Error:", error);
    res.redirect("/login?error=verification_failed");
  }
}
