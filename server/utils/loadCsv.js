const fs = require('fs');
const csv = require('csv-parser');

function loadCsv(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Convert values to float and time to Date
        results.push({
          time: new Date(data.time),
          co: parseFloat(data.co),
          no: parseFloat(data.no),
          no2: parseFloat(data.no2),
          so2: parseFloat(data.so2),
          o3: parseFloat(data.o3),
        });
      })
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

module.exports = loadCsv;
