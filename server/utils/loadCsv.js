const fs = require('fs');
const csv = require('csv-parser');

function loadCsv(filePath, lat, lon) {
  return new Promise((resolve, reject) => {
    let lastValidRow = null;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        const row = {
          time: new Date(data.time),
          lat,
          lon,
          co: parseFloat(data.co),
          no: parseFloat(data.no),
          no2: parseFloat(data.no2),
          so2: parseFloat(data.so2),
          o3: parseFloat(data.o3),
        };

        // Keep only if at least one pollutant is valid
        const hasData = ['co', 'no', 'no2', 'so2', 'o3'].some((key) => !isNaN(row[key]));
        if (hasData) {
          lastValidRow = row;
        }
      })
      .on('end', () => resolve(lastValidRow ? [lastValidRow] : []))
      .on('error', reject);
  });
}

module.exports = loadCsv;
