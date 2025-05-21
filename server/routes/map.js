const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');

// Open your database
const db = new Database('data/skg-breath.db');

// GET /api/map
router.get('/', (req, res) => {
  // Fetch municipalities with latest measurement
  const municipalities = db.prepare(`
    SELECT m.name AS municipality, m.lat, m.lon,
           meas.time, meas.co, meas.no, meas.no2, meas.so2, meas.o3
    FROM municipalities m
    JOIN (
      SELECT municipality_id, MAX(time) AS max_time
      FROM measurements
      GROUP BY municipality_id
    ) latest ON latest.municipality_id = m.id
    JOIN measurements meas
      ON meas.municipality_id = latest.municipality_id
     AND meas.time = latest.max_time
    ORDER BY m.name
  `).all();

  const result = municipalities.map(row => ({
    municipality: row.municipality,
    lat: row.lat,
    lon: row.lon,
    time: row.time,
    co: parseFloat(row.co),
    no: parseFloat(row.no),
    no2: parseFloat(row.no2),
    so2: parseFloat(row.so2),
    o3: parseFloat(row.o3)
  }));

  res.json(result);
});

module.exports = router;
