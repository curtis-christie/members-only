import { Router } from "express";
import { requireAuth } from "../middleware/checkAuth.js";
import db from "../models/index.model.js";

const messageRouter = Router();

messageRouter.get("/create", (req, res) => {
  res.render("create-message");
});

messageRouter.post("/create", requireAuth, async (req, res) => {
  try {
    const author_id = req.user.id;
    const { title, body } = req.body;
    await db.message.createMessage({
      title,
      body,
      author_id,
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("failed to create message");
  }
});

messageRouter.post("/delete/:id", async (req, res) => {
  db.message.deleteMessageById(req.params.id);
  res.status(201).redirect("/");
});

export default messageRouter;
