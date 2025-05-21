const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

// Routes
const okgAirRoute = require('./routes/okgAir');
const mapRoute = require('./routes/map');

app.use('/api/okgAir',okgAirRoute);
app.use('/api/map',mapRoute)

app.get('/', (req, res) => {
  res.send('Welcome to SKG-BREATH backend!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
