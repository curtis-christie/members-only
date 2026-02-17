import express from "express";
import passport from "passport";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sessionMiddleware from "./config/session.js";
import { configurePassport } from "./config/passport.js";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/messages.routes.js";
import dotenv from "dotenv";
import { indexRouter } from "./routes/index.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
// sessions must come before passport.session()
app.use(sessionMiddleware);

// Register strategy + serializers
configurePassport();

// Passport middleware
app.use(passport.session());
app.use("/", indexRouter);
app.use("/sign-up", userRouter);
app.use("/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
