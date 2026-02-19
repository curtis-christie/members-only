import { validationResult } from "express-validator";

export function handleValidationErrors(req, res, next) {
  const result = validationResult(req);

  if (result.isEmpty()) return next();

  return res.status(400).json({
    message: "Validation failed",
    errors: result.array().map((e) => ({
      field: e.path, // aka param name
      location: e.location, // body/query/params/etc
      msg: e.msg,
      value: e.value,
    })),
  });
}
