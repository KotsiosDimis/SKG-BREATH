const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());

// Routes
const openWeatherRoute = require('./routes/openWeather');
app.use('/api/open-weather', openWeatherRoute);

app.get('/', (req, res) => {
  res.send('Welcome to SKG-BREATH backend!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
