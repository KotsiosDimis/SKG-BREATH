const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = 3001;

app.use(cors());

// Routes
const openWeatherRoute = require('./routes/openWeather');
const eeaParquet = require('./routes/eeaParquet');
app.use('/api/open-weather', openWeatherRoute);
app.use('/api/eea', eeaParquet);

app.get('/', (req, res) => {
  res.send('Welcome to SKG-BREATH backend!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
