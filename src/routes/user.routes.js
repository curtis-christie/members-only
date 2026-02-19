import { Router } from "express";
import { handleSignup } from "../controllers/usersController.js";
import { signupValidation } from "../validators/users.validator.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.render("sign-up-form");
});
userRouter.post("/", signupValidation, handleValidationErrors, handleSignup);

userRouter.patch("/join-club/:id", (req, res) => {
  // update logic
});

export default userRouter;
