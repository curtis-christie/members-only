import { Router } from "express";
import { handleSignup } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.render("sign-up-form");
});
userRouter.post("/", handleSignup);

export default userRouter;
