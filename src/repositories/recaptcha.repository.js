const db = require('../config/db');

async function salvarLogRecaptcha({ ip, score, sucesso }) {
  const sql = 'INSERT INTO recaptcha_logs (ip, score, sucesso) VALUES (?, ?, ?)';
  await db.query(sql, [ip, score, sucesso]);
}

module.exports = { salvarLogRecaptcha };
