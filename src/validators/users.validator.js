import { body } from "express-validator";

export const signupValidation = [
  body("first_name")
    .notEmpty()
    .withMessage("Must enter name")
    .trim()
    .isString()
    .withMessage("First name must only include letters")
    .isLength({ min: 1, max: 25 })
    .withMessage("Name must be between 1 and 25 characters"),

  body("last_name")
    .notEmpty()
    .withMessage("Must enter name")
    .trim()
    .isString()
    .withMessage("First name must only include letters"),

  body("email")
    .notEmpty()
    .withMessage("Must enter email")
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Must enter password")
    .isString()
    .withMessage("Password must be a string")
    .trim()
    .isLength({ min: 12, max: 128 })
    .withMessage("Password must be 12–128 characters")
    .custom((value) => {
      // Reject whitespace anywhere (including middle)
      if (/\s/.test(value)) throw new Error("Password must not contain spaces");

      // Character class requirements
      if (!/[a-z]/.test(value)) throw new Error("Password must include a lowercase letter");
      if (!/[A-Z]/.test(value)) throw new Error("Password must include an uppercase letter");
      if (!/[0-9]/.test(value)) throw new Error("Password must include a number");
      if (!/[^A-Za-z0-9]/.test(value)) throw new Error("Password must include a symbol");

      // Very common passwords (starter list)
      const banned = new Set([
        "password",
        "password123",
        "12345678",
        "qwerty123",
        "letmein",
        "iloveyou",
        "admin123",
      ]);

      if (banned.has(value.toLowerCase())) {
        throw new Error("Password is too common");
      }

      return true;
    }),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Must enter password")
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];
