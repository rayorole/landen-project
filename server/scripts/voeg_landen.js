const sqlite3 = require("sqlite3").verbose();

// Initialiseer de database
const db = new sqlite3.Database("../database/landen.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the contacts database.");
});

const countries = [
  { land: "België", hoofdstad: "Brussel" },
  { land: "Nederland", hoofdstad: "Amsterdam" },
  { land: "Frankrijk", hoofdstad: "Parijs" },
  { land: "Duitsland", hoofdstad: "Berlijn" },
  { land: "Spanje", hoofdstad: "Madrid" },
  { land: "Italië", hoofdstad: "Rome" },
  { land: "Griekenland", hoofdstad: "Athene" },
  { land: "Portugal", hoofdstad: "Lissabon" },
  { land: "Engeland", hoofdstad: "Londen" },
  { land: "Ierland", hoofdstad: "Dublin" },
  { land: "Zweden", hoofdstad: "Stockholm" },
  { land: "Noorwegen", hoofdstad: "Oslo" },
  { land: "Denemarken", hoofdstad: "Kopenhagen" },
  { land: "Finland", hoofdstad: "Helsinki" },
  { land: "Polen", hoofdstad: "Warschau" },
  { land: "Oostenrijk", hoofdstad: "Wenen" },
  { land: "Zwitserland", hoofdstad: "Bern" },
];

countries.forEach((country) => {
  db.run(
    `INSERT INTO landen (land, hoofdstad) VALUES ("${country.land}", "${country.hoofdstad}")`,
    (err) => {
      if (err) {
        console.log(err.message);
      }
      console.log("Country added");
    }
  );
});
