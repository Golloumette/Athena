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

module.exports = { insertResponse, insertRequete };
