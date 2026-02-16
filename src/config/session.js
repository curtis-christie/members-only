import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "../db/pool.js";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;
const PgSession = connectPgSimple(session);

const sessionMiddleware = session({
  store: new PgSession({
    pool,
    tableName: "session",
    createTableIfMissing: true,
  }),
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
});

export default sessionMiddleware;
