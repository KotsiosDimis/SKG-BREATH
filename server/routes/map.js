const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');

const db = new Database('data/skg-breath.db');

router.get('/', (req, res) => {
  try {
    const dateParam = req.query.date; // optional ?date=YYYY-MM-DD
    let rows;

    if (dateParam) {
      // Ensure date format is valid
      const isoDate = new Date(dateParam).toISOString().split('T')[0]; // "YYYY-MM-DD"

      rows = db.prepare(`
        SELECT m.name AS municipality, m.lat, m.lon,
               meas.time, meas.co, meas.no, meas.no2, meas.so2, meas.o3
        FROM municipalities m
        JOIN (
          SELECT municipality_id, MAX(time) AS time
          FROM measurements
          WHERE DATE(time) = ?
          GROUP BY municipality_id
        ) latest ON latest.municipality_id = m.id
        JOIN measurements meas
          ON meas.municipality_id = latest.municipality_id
         AND meas.time = latest.time
        WHERE m.lat IS NOT NULL AND m.lon IS NOT NULL
        ORDER BY m.name
      `).all(isoDate);
    } else {
      // Default: latest available for each municipality
      rows = db.prepare(`
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
        WHERE m.lat IS NOT NULL AND m.lon IS NOT NULL
        ORDER BY m.name
      `).all();
    }

    const result = rows.map(row => ({
      municipality: row.municipality,
      lat: row.lat,
      lon: row.lon,
      time: row.time,
      co: row.co !== null ? parseFloat(row.co) : null,
      no: row.no !== null ? parseFloat(row.no) : null,
      no2: row.no2 !== null ? parseFloat(row.no2) : null,
      so2: row.so2 !== null ? parseFloat(row.so2) : null,
      o3: row.o3 !== null ? parseFloat(row.o3) : null
    }));

    res.json(result);
  } catch (err) {
    console.error('❌ Error in /api/map:', err.message);
    res.status(500).json({ error: 'Failed to load map data' });
  }
});

module.exports = router;
