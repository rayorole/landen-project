const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/landen.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the contacts database.");
});

const app = express();

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

app.post("/", (req, res) => {
  db.run(
    "INSERT INTO landen (naam, hoofdstad) VALUES (?, ?)",
    [req.body.naam, req.body.hoofdstad],
    (err) => {
      if (err) {
        res.json({ error: err.message });
        console.error(err.message);
      }
      res.json({ message: "Success" });
    }
  );
});

app.delete("/:id", (req, res) => {
  db.run("DELETE FROM landen WHERE id = ?", req.params.id, (err) => {
    if (err) {
      res.json({ error: err.message });
      console.error(err.message);
    }
    res.json({ message: "Success" });
  });
});

app.put("/:id", (req, res) => {
  db.run(
    "UPDATE landen SET naam = ?, hoofdstad = ? WHERE id = ?",
    [req.body.naam, req.body.hoofdstad, req.params.id],
    (err) => {
      if (err) {
        res.json({ error: err.message });
        console.error(err.message);
      }
      res.json({ message: "Success" });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
