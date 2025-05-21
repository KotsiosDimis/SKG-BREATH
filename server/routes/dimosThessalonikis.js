// server/routes/airQualitySummary.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const router = express.Router();

const data = [];
const csvPath = path.join(__dirname, '../datasets/Dimos_Thessalonikis_14-23.csv');

fs.createReadStream(csvPath)
  .pipe(csv())
  .on('data', (row) => {
    const date = new Date(row['Ημερομηνία']);
    const pm10 = parseFloat(row['PM10 (μgr/m3)']);
    const pm25 = parseFloat(row['PM2.5 (μgr/m3)']);
    if (!isNaN(date)) {
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      data.push({ date, yearMonth, pm10, pm25 });
    }
  })
  .on('end', () => {
    console.log('✅ Summary CSV data loaded');
  });

// GET /api/air-quality?from=YYYY-MM-DD&to=YYYY-MM-DD
router.get('/', (req, res) => {
  const { from, to } = req.query;
  let filtered = data;

  if (from || to) {
    const fromDate = from ? new Date(from) : new Date('1900-01-01');
    const toDate = to ? new Date(to) : new Date();
    filtered = data.filter((d) => d.date >= fromDate && d.date <= toDate);
  }

  res.json(filtered);
});

// GET /api/air-quality/summary?groupBy=month|year
router.get('/summary', (req, res) => {
  const groupBy = req.query.groupBy || 'month';
  const grouped = {};

  data.forEach(({ date, yearMonth, pm10, pm25 }) => {
    const key = groupBy === 'year' ? `${date.getFullYear()}` : yearMonth;
    if (!grouped[key]) grouped[key] = { total10: 0, total25: 0, count: 0 };
    if (!isNaN(pm10)) grouped[key].total10 += pm10;
    if (!isNaN(pm25)) grouped[key].total25 += pm25;
    grouped[key].count++;
  });

  const summary = Object.entries(grouped).map(([period, { total10, total25, count }]) => ({
    period,
    avg_pm10: +(total10 / count).toFixed(2),
    avg_pm25: +(total25 / count).toFixed(2),
  }));

  res.json(summary);
});

module.exports = router;
