import { Router } from "express";
import { requireAuth } from "../middleware/checkAuth.js";
import { validationResult } from "express-validator";
import { body } from "express-validator";
import db from "../models/index.model.js";

const joinRouter = Router();

joinRouter.get("/", requireAuth, (req, res) => {
  if (req.user?.is_member) return res.redirect("/");
  res.render("join", { errors: [], form: { passcode: "" } });
});

joinRouter.post(
  "/",
  body("passcode")
    .trim()
    .notEmpty()
    .withMessage("Passcode is required.")
    .custom((value) => {
      if (value !== process.env.CLUB_PASSCODE) {
        throw new Error("Incorrect passcode.");
      }
      return true;
    }),
  async (req, res) => {
    const errors = validationResult(req);
    const form = { passcode: req.body.passcode ?? "" };

    if (!errors.isEmpty()) {
      return res.status(400).render("join", { errors: errors.array(), form });
    }

    await db.user.setMembership(req.user.id, true);

    req.user.is_member = true;

    return res.redirect("/");
  },
);

export default joinRouter;
