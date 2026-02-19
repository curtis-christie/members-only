import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import db from "../models/index.model.js";

export function configurePassport() {
  // 1) Local Strategy: how login verifies credentials
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: false,
      },
      async (email, password, done) => {
        try {
          const user = await db.user.findByEmail(email);
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

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.user.findById(id);
      return done(null, user || false);
    } catch (err) {
      return done(err);
    }
  });
}
