const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');

const db = new Database('data/skg-breath.db');

// 🟢 List all municipalities
router.get('/municipalities', (req, res) => {
  const rows = db.prepare(`SELECT name FROM municipalities`).all();
  res.json(rows.map(r => r.name));
});

// 🟢 Query data with filters
router.get('/data', (req, res) => {
  const { municipality, year, month, day, hour, pollutant } = req.query;

  if (!municipality) {
    return res.status(400).json({ error: 'Municipality is required' });
  }

  const muniRow = db.prepare(`SELECT id FROM municipalities WHERE name = ?`).get(municipality);
  if (!muniRow) {
    return res.status(404).json({ error: 'Municipality not found' });
  }

  let query = `SELECT time, co, no, no2, so2, o3 FROM measurements WHERE municipality_id = ?`;
  const params = [muniRow.id];

  if (year) {
    query += ` AND strftime('%Y', time) = ?`;
    params.push(year);
  }
  if (month) {
    query += ` AND strftime('%m', time) = ?`;
    params.push(String(month).padStart(2, '0'));
  }
  if (day) {
    query += ` AND strftime('%d', time) = ?`;
    params.push(String(day).padStart(2, '0'));
  }
  if (hour) {
    query += ` AND strftime('%H', time) = ?`;
    params.push(String(hour).padStart(2, '0'));
  }

  const rows = db.prepare(query).all(...params);

  const result = pollutant
    ? rows.map(row => ({ time: row.time, [pollutant]: row[pollutant] }))
    : rows;

  res.json(result);
});

// 🟢 Average pollutant values by day/month/year (fixed alias name)
router.get('/average', (req, res) => {
  const { municipality, by = 'day', pollutant } = req.query;

  if (!municipality || !pollutant) {
    return res.status(400).json({ error: 'municipality and pollutant are required' });
  }

  const muniRow = db.prepare(`SELECT id FROM municipalities WHERE name = ?`).get(municipality);
  if (!muniRow) {
    return res.status(404).json({ error: 'Municipality not found' });
  }

  let groupExpr;
  if (by === 'year') groupExpr = `strftime('%Y', time)`;
  else if (by === 'month') groupExpr = `strftime('%Y-%m', time)`;
  else groupExpr = `strftime('%Y-%m-%d', time)`;

  const query = `
    SELECT ${groupExpr} AS grouping, AVG(${pollutant}) AS avg
    FROM measurements
    WHERE municipality_id = ?
      AND ${pollutant} IS NOT NULL
    GROUP BY grouping
    ORDER BY grouping
  `;

  const rows = db.prepare(query).all(muniRow.id);
  res.json(rows);
});

// 🟢 Raw data for a specific municipality
router.get('/:municipality', (req, res) => {
  const name = req.params.municipality;
  const muniRow = db.prepare(`SELECT id FROM municipalities WHERE name = ?`).get(name);

  if (!muniRow) {
    return res.status(404).json({ error: `Data for '${name}' not found.` });
  }

  const rows = db.prepare(`
    SELECT time, co, no, no2, so2, o3 FROM measurements
    WHERE municipality_id = ?
    ORDER BY time
    LIMIT 1000
  `).all(muniRow.id);

  res.json(rows);
});

module.exports = router;
