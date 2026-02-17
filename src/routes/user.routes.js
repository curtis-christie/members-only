import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.render("sign-up-form");
});
userRouter.post("/", (req, res) => {
  res.redirect("/sign-up");
});

export default userRouter;
