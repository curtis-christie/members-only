import express from "express";
import passport from "passport";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sessionMiddleware from "./config/session.js";
import dotenv from "dotenv";
import { configurePassport } from "./config/passport.js";
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
// sessions must come before passport.session()
app.use(sessionMiddleware);

// Register strategy + serializers
configurePassport();

// Passport middleware
app.use(passport.session());

// Routes
app.get("/sign-up", (req, res) => {
  res.render("sign-up-form");
});

app.post("/sign-up", (req, res) => {
  res.send("sign up post");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
