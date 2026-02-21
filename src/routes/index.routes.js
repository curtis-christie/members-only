import { Router } from "express";
import db from "../models/index.model.js";

export const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  const messages = await db.message.getMessagesByAuthor();
  res.render("home-page", { messages: messages });
});
