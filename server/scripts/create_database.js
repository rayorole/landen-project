const sqlite3 = require("sqlite3").verbose();

// Initialiseer de database
const db = new sqlite3.Database("../database/landen.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the contacts database.");
});

// Maak de tabel aan
db.run(
  "CREATE TABLE landen (id INTEGER PRIMARY KEY AUTOINCREMENT, land TEXT, hoofdstad TEXT)",
  (err) => {
    if (err) {
      console.log(err.message);
    }
    console.log("Table created");
  }
);
