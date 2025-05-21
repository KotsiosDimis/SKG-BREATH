const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const loadCsv = require('../utils/loadCsv');

const DATA_DIR = path.join(__dirname, '../datasets/Open_Knolage_Greece/');

// In-memory cache (you can replace with DB later)
const datasets = {};

async function loadAllData() {
  const files = fs.readdirSync(DATA_DIR);
  for (const file of files) {
    if (file.endsWith('.csv')) {
      const key = path.basename(file, '.csv');
      datasets[key] = await loadCsv(path.join(DATA_DIR, file));
    }
  }
  console.log('✅ CSV data loaded:', Object.keys(datasets));
}

// Load on startup
loadAllData();

// List municipalities
router.get('/municipalities', (req, res) => {
  res.json(Object.keys(datasets));
});

// Query data
router.get('/data', (req, res) => {
  const { municipality, year, month, day, hour, pollutant } = req.query;

  if (!datasets[municipality]) {
    return res.status(404).json({ error: 'Municipality not found' });
  }

  let data = datasets[municipality];

  if (year) data = data.filter(r => new Date(r.time).getFullYear() == year);
  if (month) data = data.filter(r => new Date(r.time).getMonth() + 1 == month);
  if (day) data = data.filter(r => new Date(r.time).getDate() == day);
  if (hour) data = data.filter(r => new Date(r.time).getHours() == hour);

  if (pollutant) {
    data = data.map(r => ({ time: r.time, [pollutant]: r[pollutant] }));
  }

  res.json(data);
});

// Average by day/month/year
router.get('/average', (req, res) => {
  const { municipality, by = 'day', pollutant } = req.query;

  if (!datasets[municipality]) {
    return res.status(404).json({ error: 'Municipality not found' });
  }

  const data = datasets[municipality];
  const grouped = {};

  for (const row of data) {
    const date = new Date(row.time);
    let key;
    if (by === 'year') key = date.getFullYear();
    else if (by === 'month') key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    else key = date.toISOString().split('T')[0];

    if (!grouped[key]) grouped[key] = { count: 0, sum: 0 };
    grouped[key].sum += row[pollutant] || 0;
    grouped[key].count += 1;
  }

  const result = Object.entries(grouped).map(([group, { sum, count }]) => ({
    group,
    avg: count > 0 ? sum / count : null
  }));

  res.json(result);
});

module.exports = router;
