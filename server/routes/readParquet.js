const express = require('express');
const router = express.Router();
const parquet = require('parquetjs-lite');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// GET /api/read/preview?url=<parquet_url>
router.get('/preview', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: 'Missing ?url param' });

    const localPath = path.join(__dirname, '../data/temp.parquet');

    // Download the Parquet file
    const response = await axios.get(url, { responseType: 'stream' });
    const writer = fs.createWriteStream(localPath);
    response.data.pipe(writer);

    writer.on('finish', async () => {
      try {
        const reader = await parquet.ParquetReader.openFile(localPath);
        const cursor = reader.getCursor();
        const rows = [];

        for (let i = 0; i < 10; i++) {
          const row = await cursor.next();
          if (!row) break;
          rows.push(row);
        }

        await reader.close();
        res.json(rows);
      } catch (err) {
        console.error('Parquet read error:', err);
        res.status(500).json({ error: 'Failed to read Parquet file' });
      }
    });

    writer.on('error', err => {
      console.error('Write error:', err);
      res.status(500).json({ error: 'Failed to write file' });
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Unexpected error' });
  }
});

module.exports = router;
