import { pool } from "../db/pool.js";

// create user
export async function createUser(user) {
  const { firstName, lastName, email, passwordHash } = user;

  const result = await pool.query(
    `
    INSERT INTO users
    (first_name, last_name, email, password_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [firstName, lastName, email, passwordHash],
  );

  return result;
}

// find user by email (login)
export async function findByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
}

// find by ID
export async function findById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

// update membership
export async function setMembership(userId, isMember) {
  await pool.query("UPDATE users SET is_member = $1 WHERE id = $2", [isMember, userId]);
}
