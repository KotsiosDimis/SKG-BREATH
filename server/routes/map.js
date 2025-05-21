const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const loadCsv = require('../utils/loadCsv');

// Assuming this is shared
const DATA_DIR = path.join(__dirname, '../datasets/Open_Knolage_Greece/');
const datasets = {};

//coordinates for municipalities 
const coordinates = {
  ampelokipon: [40.6300, 231.6875],
  dimos_delta: [40.6700, 22.8000],
  kalamaria: [40.5800, 22.9500],
  khalkedonos: [40.7500, 22.5800],
  kordeliou: [40.6600, 22.9100],
  lagkada: [40.8000, 23.0500],
  neapoles_sukeon: [40.6500, 22.9500],
  oraiokastrou: [40.7000, 22.9100],
  paulou_mela: [40.6600, 22.9200],
  pulaias_khortiate: [40.6000, 23.0000],
  thermaikou: [40.4900, 22.9200],
  thermi: [40.5400, 23.0200],
  thessaloniki: [40.6401, 22.9444],
  volvi: [40.7200, 23.4500]
};

async function loadData() {
  const files = fs.readdirSync(DATA_DIR);
  for (const file of files) {
    if (file.endsWith('.csv')) {
      const key = file.replace('.csv', '');
      datasets[key] = await loadCsv(path.join(DATA_DIR, file));
    }
  }
  console.log('✅ /map data loaded');
}

loadData();

// GET /api/map
router.get('/', (req, res) => {
  const result = [];

  for (const [municipality, readings] of Object.entries(datasets)) {
    const coords = coordinates[municipality];
    if (!coords) continue;

    if (!readings || readings.length === 0) continue;

    // Get the most recent row (assumes sorted by time or you sort it)
    const latest = readings[readings.length - 1];

    result.push({
      municipality,
      lat: coords[0],
      lon: coords[1],
      time: latest.time,
      co: parseFloat(latest.co),
      no: parseFloat(latest.no),
      no2: parseFloat(latest.no2),
      so2: parseFloat(latest.so2),
      o3: parseFloat(latest.o3),
    });
  }

  res.json(result);
});


module.exports = router;
