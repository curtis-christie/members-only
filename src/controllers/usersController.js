import bcrypt from "bcryptjs";
import db from "../models/index.model.js";

const SALT_ROUNDS = 10;

export async function handleSignup(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    await db.user.createUser({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("signup failed");
  }
}
