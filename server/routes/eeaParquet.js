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

  // 4. POST /read-parquet
  router.post('/read-parquet', async (req, res) => {
    const { url } = req.body;
  
    if (!url) {
      return res.status(400).json({ error: 'Missing URL in request body.' });
    }
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch file: ${response.statusText}`);
  
      const buffer = await response.buffer();
      const stream = Readable.from(buffer);
      const reader = await parquet.ParquetReader.openBuffer(buffer);
      const cursor = reader.getCursor();
      let record;
      const records = [];
  
      while ((record = await cursor.next())) {
        records.push(record);
      }
  
      await reader.close();
      res.json(records);
    } catch (err) {
      console.error('Read parquet error:', err.message);
      res.status(500).json({ error: 'Failed to read parquet file.' });
    }
  });
  
  

module.exports = router;
