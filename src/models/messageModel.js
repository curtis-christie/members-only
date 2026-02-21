import pool from "../db/pool.js";

// create message
async function createMessage(message) {
  const { title, body, author_id } = message;
  const result = await pool.query(
    `
    INSERT INTO messages (title, body, author_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [title, body, author_id],
  );

  return result.rows[0];
}

// get all messages
async function getAllMessages() {
  const results = await pool.query(`
    SELECT *
    FROM messages
    JOIN users ON users.id = messages.author_id
    ORDER BY messages.created_at DESC
    `);
  return results.rows;
}

// get all messages with author info
async function getMessagesByAuthor() {
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
async function deleteMessageById(id) {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

export const message = {
  createMessage,
  getMessagesByAuthor,
  deleteMessageById,
  getAllMessages,
};
