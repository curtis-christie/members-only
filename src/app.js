import express from "express";
import session from "express-session";
import passport from "passport";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const app = express();
const PORT = dotenv.config.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
