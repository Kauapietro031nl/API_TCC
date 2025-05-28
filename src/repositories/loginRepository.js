const pool = require('../config/db');

const findUserByEmail = async (email) => {
  const sql = 'SELECT * FROM login WHERE email = ?';
  try {
    const [results] = await pool.query(sql, [email]);
    return results[0] || null;
  } catch (err) {
    throw err;
  }
};

module.exports = { findUserByEmail };
