import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import cors, { runMiddleware } from "../../lib/cors";

const prisma = new PrismaClient();
export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method != "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { username, password } = req.body;
  try {
    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { email: username },
    });

    // If user not found, return an error
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    if (!user || !(password === user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.id, username: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const role = user.role;

    // Send the token in the response
    res.status(200).json({ token, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
