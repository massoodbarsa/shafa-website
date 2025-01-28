import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  try {
    const { email, password, medicalLicense } = req.body;

    // Validate inputs
    if (!email || !password || !medicalLicense) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Authenticate user
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) throw authError;

    // Verify doctor profile with license number
    const { data: doctorData, error: doctorError } = await supabase
      .from("doctor")
      .select("*")
      .eq("user_id", authData.user.id)
      .eq("license_number", medicalLicense)
      .single();

    if (doctorError || !doctorData) {
      return res.status(403).json({ error: "Invalid medical license number" });
    }

    // Return success response
    res.status(200).json({
      user: authData.user,
      session: authData.session,
      doctorProfile: doctorData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
