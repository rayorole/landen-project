const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

// Connecteer met de database
const db = new sqlite3.Database("./database/landen.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the contacts database.");
});

const app = express();

// Zorg ervoor dat de server JSON data kan versturen en ontvangen
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const port = 3000;

// Verkrijg alle landen uit de database en stuur ze terug naar de client (browser)
app.get("/", (req, res) => {
  db.all("SELECT * FROM landen", (err, rows) => {
    if (err) {
      // Als er een error is, stuur dan een error bericht terug naar de client
      res.json({ error: err.message });
      console.error(err.message);
    }
    res.json(rows);
  });
});

// Verkrijg landen uit de database door de gegeven query en stuur het terug naar de client (browser)
app.get("/search/:query", (req, res) => {
  db.all(
    `SELECT * FROM landen WHERE land LIKE '%${req.params.query}%'`,
    (err, rows) => {
      if (err) {
        res.json({ error: err.message });
        console.error(err.message);
        return;
      }

      res.json(rows);
    }
  );
});

// Voeg een land toe aan de database en stuur een bericht terug naar de client (browser)
app.post("/", (req, res) => {
  db.run(
    "INSERT INTO landen (land, hoofdstad) VALUES (?, ?)",
    [req.body.land, req.body.hoofdstad],
    (err) => {
      if (err) {
        res.json({ error: err.message });
        console.error(err.message);
      }
      res.json({ message: "Success" });
    }
  );
});

// Verwijder een land uit de database met een gegeven ID en stuur een bericht terug naar de client (browser)
app.delete("/:id", (req, res) => {
  db.run("DELETE FROM landen WHERE id = ?", req.params.id, (err) => {
    if (err) {
      res.json({ error: err.message });
      console.error(err.message);
    }
    res.json({ message: "Success" });
  });
});

// Update een land in de database en stuur een bericht terug naar de client (browser)
app.put("/:id", (req, res) => {
  db.run(
    "UPDATE landen SET land = ?, hoofdstad = ? WHERE id = ?",
    [req.body.land, req.body.hoofdstad, req.params.id],
    (err) => {
      if (err) {
        res.json({ error: err.message });
        console.error(err.message);
      }
      res.json({ message: "Success" });
    }
  );
});

// Start de server op de gegeven poort
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
