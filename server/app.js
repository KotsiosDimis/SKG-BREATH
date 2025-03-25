const express = require('express');
const airRoutes = require('./routes/airRoutes');

const app = express();
app.use(express.json());

app.use('/api', airRoutes); // Example: /api/skg-air

app.get('/', (req, res) => {
    res.send('SkgBreath API is running');
  });

module.exports = app;
