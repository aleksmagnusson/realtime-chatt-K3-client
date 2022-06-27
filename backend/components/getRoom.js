// Anslut med SQL och hämta room.
const { db } = require("../db/db");

// Hämta room med SELECT * FROM room WHERE name = ?
// Gäller det samma för att hämta meddelanden och alla rum??
// Samma formel som med Library-API.

async function getRoom(data) {
  const sql = `SELECT * FROM room WHERE name = ?`;

  return new Promise((resolve, reject) => {
    db.all(sql, [data.room], (error, rows) => {
      if (error) {
        console.log(error.message);
        resolve.status(500);
        reject(error);
      }
      resolve(rows);
    });
  });
}

module.exports = { getRoom };
