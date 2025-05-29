const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const API_KEY = process.env.OPENAQ_API_KEY;

router.get('/', async (req, res) => {
  try {
    const sensorId = '7773691'; // example for PM2.5 at Agia Sofia
    const response = await fetch(`https://api.openaq.org/v3/sensors/${sensorId}/measurements?limit=1`, {
      headers: { 'X-API-Key': API_KEY },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: 'OpenAQ API Error', details: data });
    }

    const latest = data.results[0];
    res.json({
      station: 'AGIA SOFIA',
      parameter: 'PM2.5',
      value: latest.value,
      unit: latest.parameter.units,
      from: latest.period.datetimeFrom.local,
      to: latest.period.datetimeTo.local,
    });
  } catch (err) {
    console.error('Live fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
