import pool from "../db/pool.js";

// create message
export async function createMessage({ title, body, authorId }) {
  const result = await pool.query(
    `
    INSERT INTO messages (title, body, author_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [title, body, authorId],
  );

  return result.rows[0];
}

// get all messages with author info
export async function name() {
  const result = await pool.query(`
    SELECT
      m.*,
      u.first_name,
      u.last_name
    FROM messages m
    JOIN users u ON u.id = m.author_id
    ORDER BY m.created_at DESC
  `);
  return result.rows;
}

// delete message
export async function name(id) {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}
