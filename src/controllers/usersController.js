import bcrypt from "bcryptjs";
import db from "../models/index.model.js";

const SALT_ROUNDS = 10;

export async function handleSignup(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    let is_admin = false;
    if (req.body.is_admin === "1") {
      is_admin = true;
    }
    console.log(is_admin);

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    await db.user.createUser({
      firstName,
      lastName,
      email,
      passwordHash,
      is_admin,
    });

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("signup failed");
  }
}

export async function handleLogout(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
}

// logout: (req, res, next) => {
//         req.logout(err => {
//             if (err) return next(err);
//             res.redirect("/");
//         });
//     }
