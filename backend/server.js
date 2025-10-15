const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
//kontroller ne legyen a frontendbe ha keszen vagyok
// Middlewares
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, 
  dateStrings: true
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err.message);
  } else {
    console.log("MySQL connected.");
  }
});

app.get("/", (_req, res) => {
  res.send("API is running...");
});

app.get("/api/szobak", (_req, res) => {
  const sql = "SELECT * FROM szobak";
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get("/api/rooms/utilization", (_req, res) => {
  const sql = `
    SELECT s.szazon, s.sznev,
           COALESCE(SUM(f.fo), 0) AS osszesFo,
           COALESCE(SUM(DATEDIFF(f.tav, f.erk)), 0) AS osszesEjszaka
    FROM szobak s
    LEFT JOIN foglalasok f ON f.szoba = s.szazon
    GROUP BY s.szazon, s.sznev
    ORDER BY s.sznev, s.szazon
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get("/api/rooms/:id/bookings", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Érvénytelen szoba id" });
  }

  const sql = `
    SELECT f.fsorsz, v.vnev, f.erk, f.tav, f.fo
    FROM foglalasok f
    JOIN vendegek v ON v.vsorsz = f.vendeg
    WHERE f.szoba = ?
    ORDER BY f.erk, f.tav, f.fsorsz
  `;
  db.query(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
