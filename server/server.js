const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

// Routes
const openWeatherRoute = require('./routes/openWeather');
//const eeaParquet = require('./routes/eeaParquet');
const readParquetRoute = require('./routes/readParquet');
const dimosThessalonikisRoute = require('./routes/dimosThessalonikis');
const okgAirRoute = require('./routes/okgAir');


app.use('/api/open-weather', openWeatherRoute);
//app.use('/api/eea', eeaParquet);
app.use('/api/read', readParquetRoute);
app.use('/api/dimos-thessalonikis', dimosThessalonikisRoute);
app.use('/api/okgAir',okgAirRoute);

app.get('/', (req, res) => {
  res.send('Welcome to SKG-BREATH backend!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
