const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = '4852329548f7df1315831b18689d11d5ccf7f3a2cbf056537442448c74c5eef7';

// GET /api/openaq/thessaloniki — Measurements from valid sensors near Thessaloniki
router.get('/thessaloniki', async (req, res) => {
  try {
    // Step 1: Get locations near Thessaloniki
    const locResponse = await axios.get('https://api.openaq.org/v3/locations', {
      headers: { 'X-API-Key': API_KEY },
      params: {
        coordinates: '40.6401,22.9444',
        radius: 5000,
        limit: 10
      }
    });

    const locations = locResponse.data.results;
    console.log('📍 Locations found:', locations.map(l => ({ id: l.id, name: l.name })));

    const allData = [];

    // Step 2: Loop through each location and its parameters
    for (const loc of locations) {
      for (const param of loc.parameters || []) {
        try {
          const measRes = await axios.get('https://api.openaq.org/v3/measurements', {
            headers: { 'X-API-Key': API_KEY },
            params: {
              location_id: loc.id,
              parameter: param.parameter,
              limit: 5
            }
          });

          if (measRes.data.results.length > 0) {
            allData.push({
              location: loc.name,
              location_id: loc.id,
              pollutant: param.parameter,
              coordinates: loc.coordinates,
              measurements: measRes.data.results
            });
          } else {
            console.log(`ℹ️ No data for ${loc.name} (${param.parameter})`);
          }
        } catch (err) {
          console.warn(`❌ Skipping ${loc.name} (${param.parameter}):`, err.response?.data?.detail || err.message);
        }
      }
    }

    res.json(allData);
  } catch (error) {
    console.error('🔥 Failed to fetch OpenAQ data:', error.message);
    res.status(500).json({ error: 'Failed to fetch OpenAQ data' });
  }
});

router.get('/sensor-data/:id', async (req, res) => {
    const sensorId = req.params.id;
    const type = req.query.type || 'raw'; // default to raw if not specified
  
    const baseUrl = 'https://api.openaq.org/v3/sensors';
  
    // Select the appropriate endpoint
    const endpoint =
      type === 'daily'
        ? `${baseUrl}/${sensorId}/days`
        : type === 'hourly'
        ? `${baseUrl}/${sensorId}/hours`
        : type === 'yearly'
        ? `${baseUrl}/${sensorId}/years`
        : `${baseUrl}/${sensorId}/measurements`; // raw data
  
    try {
      const response = await axios.get(endpoint, {
        headers: {
          'X-API-Key': API_KEY
        },
        params: {
          limit: 100 // or any other filtering options you want to support
        }
      });
  
      res.json(response.data.results || response.data);
    } catch (error) {
      console.error(`❌ Failed to fetch data for sensor ${sensorId}:`, error.message);
      const errData = error.response?.data || { error: 'Unknown error' };
      res.status(500).json(errData);
    }
  });

  router.get('/latest-thessaloniki', async (req, res) => {
    try {
      // Step 1: Get all sensors near Thessaloniki
      const sensorResponse = await axios.get('https://api.openaq.org/v3/sensors', {
        headers: { 'X-API-Key': API_KEY },
        params: {
          coordinates: '40.6401,22.9444',
          radius: 5000,
          limit: 100
        }
      });
  
      const sensors = sensorResponse.data.results;
  
      // Step 2: Fetch latest measurement for each unique pollutant
      const seenParams = new Set();
      const results = {};
  
      for (const sensor of sensors) {
        const param = sensor.parameter;
        const sensorId = sensor.id;
  
        if (seenParams.has(param)) continue;
  
        try {
          const measResponse = await axios.get(`https://api.openaq.org/v3/sensors/${sensorId}/measurements`, {
            headers: { 'X-API-Key': API_KEY },
            params: { limit: 1 }
          });
  
          const data = measResponse.data.results?.[0];
          if (data) {
            results[param] = {
              value: data.value,
              unit: data.parameter?.units || 'µg/m³',
              date: data.period?.datetimeFrom?.utc || 'unknown',
              sensor_id: sensorId
            };
            seenParams.add(param);
          }
        } catch (err) {
          console.warn(`❌ Skipping sensor ${sensorId} (${param}) -`, err.response?.data || err.message);
        }
      }
  
      res.json(results);
    } catch (error) {
      console.error('🔥 Failed to fetch latest pollutant values:', error.message);
      res.status(500).json({ error: 'Unable to retrieve latest data' });
    }
  });
  

module.exports = router;
