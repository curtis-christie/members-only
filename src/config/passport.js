import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { findByEmail, findById } from "../models/userModel.js";

export function configurePassport() {
  // 1) Local Strategy: how login verifies credentials
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (findByEmail, password, done) => {
        try {
          const user = await findByEmail(email);
          if (!user) return done(null, false, { message: "Incorrect email" });

          const ok = await bcrypt.compare(password, user.password_hash);
          if (!ok) return done(null, false, { message: "Incorrect password" });

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  passport.serializeUser(async (id, done) => {
    try {
      const user = await findById(id);
      return done(null, user || false);
    } catch (err) {
      return done(err);
    }
  });
}
