const express = require('express');
const axios = require('axios');
const router = express.Router();

// BASE URL for the EEA Parquet API
const BASE_URL = 'https://eeadmz1-downloads-api-appservice.azurewebsites.net';

// 1. GET /Country
router.get('/countries', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/Country`);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

// 2. POST /City
router.post('/cities', async (req, res) => {
    try {
      const countries = req.body;
      if (!Array.isArray(countries)) {
        return res.status(400).json({ error: 'Request body must be an array of country codes.' });
      }
  
      const response = await axios.post(`${BASE_URL}/City`, countries, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      res.json(response.data);
    } catch (err) {
      console.error('City fetch error:', err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to fetch cities' });
    }
  });

// 3. POST /ParquetFile/urls
router.post('/files', async (req, res) => {
    try {
      const response = await axios.post(`${BASE_URL}/ParquetFile/urls`, req.body, {
        headers: { 'Content-Type': 'application/json' }
      });
      res.json(response.data);
    } catch (err) {
      console.error('EEA API /files error:');
      if (err.response) {
        console.error('Status:', err.response.status);
        console.error('Data:', JSON.stringify(err.response.data, null, 2));
      } else {
        console.error('Message:', err.message);
      }
  
      res.status(500).json({ error: 'Failed to get file URLs' });
    }
  });
  
  

module.exports = router;
