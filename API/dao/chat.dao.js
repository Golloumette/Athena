const pool = require("../db");

async function insertResponse(text) {
  const [rows] = await pool.query(
    "INSERT INTO response (text_response) VALUES (?)",
    [text]
  );
  return rows.insertId;
}

async function insertRequete(id_response, text) {
  await pool.query(
    "INSERT INTO requetes (id_response, text_requete) VALUES (?, ?)",
    [id_response, text]
  );
}

async function getLastConversations(limit = 10) {
  const [rows] = await pool.query(
    `SELECT r.text_requete, s.text_response
     FROM requetes r
     JOIN response s ON r.id_response = s.id
     ORDER BY r.date_requete DESC
     LIMIT ?`,
    [limit]
  );
  return rows;
}

module.exports = { insertResponse, insertRequete, getLastConversations, };

