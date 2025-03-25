const { fetchSkgData } = require('../services/openaqService');

const getSkgAirData = async (req, res) => {
  try {
    const data = await fetchSkgData();
    res.json(data);
  } catch (error) {
    console.error('❌ Error fetching SKG data:', error.message);
    res.status(500).json({ error: 'Failed to fetch SKG air quality data' });
  }
};

module.exports = { getSkgAirData };
