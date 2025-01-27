import { connectToDatabase } from "../../../src/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, specialty, email, password } = req.body;

    // Validate input
    if (!name || !specialty || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Connect to the database
    const { db } = await connectToDatabase();

    // Check if the doctor already exists
    const existingDoctor = await db.collection("doctors").findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // Insert the new doctor into the database
    const result = await db.collection("doctors").insertOne({
      name,
      specialty,
      email,
      password, // Note: Hash the password before saving in production
      status: "pending", // Default status for admin approval
    });

    // Return success response
    res
      .status(201)
      .json({
        message: "Doctor registered successfully",
        id: result.insertedId,
      });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
