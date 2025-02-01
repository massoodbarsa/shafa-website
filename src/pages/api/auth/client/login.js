import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  console.log("selam");
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
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
    const { data: clientData, error: clientError } = await supabase
      .from("client")
      .select("*")
      .eq("user_id", authData.user.id)
      .single();

    // Return success response
    res.status(200).json({
      user: authData.user,
      session: authData.session,
      clientData: clientData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
