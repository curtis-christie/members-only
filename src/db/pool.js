import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

function must(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export default new Pool({
  host: must("PGHOST"),
  user: must("PGUSER"),
  database: must("PGDATABASE"),
  password: must("PGPASSWORD"),
  port: Number(process.env.PGPORT ?? 5432),
});
