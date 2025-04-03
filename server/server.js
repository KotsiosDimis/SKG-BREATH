const express = require('express');
const cors = require('cors'); // Import cors
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes

// Example API endpoint
app.get('/api/message', (req, res) => {
  res.json({ message: 'Omonia laos protathlima !' });
});

// If you want to serve React's production build:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
