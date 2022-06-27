const sqlite3 = require("sqlite3").verbose();

// Skapa så meddelanden, CREAT TABLE messages.

const db = new sqlite3.Database("./sqlite.db", (error) => {
  if (error) {
    console.log(error);
  }
});

// meddelande till rum(?).

module.exports = { db };
