const axios = require('axios');

const fetchSkgData = async () => {
  const response = await axios.get('https://api.openaq.org/v3/locations/2162785', {
    headers: {
      'X-API-Key': process.env.OPENAQ_API_KEY,
    },
  });
  return response.data;
};

module.exports = { fetchSkgData };
