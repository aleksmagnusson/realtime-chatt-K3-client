// Anslut med SQL och hämta alla rooms.
const { db } = require("../db/db");

// Hämta alla rum med SELECT * FROM room med sql.
async function getAllRooms() {
  const sql = `SELECT * FROM room`;

  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.log(error.message);
        resolve.status(500);
        reject(error);
      }
      resolve(rows);
    });
  });
}

module.exports = { getAllRooms };
