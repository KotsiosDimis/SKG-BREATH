const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Database = require('better-sqlite3');
const municipalities = require('./municipalities');

const DATA_DIR = path.join(__dirname, '../datasets/Open_Knolage_Greece');
const db = new Database('skg-breath.db');

// Prepared statements
const insertMunicipality = db.prepare(`
  INSERT OR IGNORE INTO municipalities (name, lat, lon) VALUES (?, ?, ?)
`);

const getMunicipalityId = db.prepare(`
  SELECT id FROM municipalities WHERE name = ?
`);

const insertMeasurement = db.prepare(`
  INSERT INTO measurements (
    municipality_id, time, co, no, no2, so2, o3
  ) VALUES (?, ?, ?, ?, ?, ?, ?)
`);

async function importCsv(file, name) {
  const filePath = path.join(DATA_DIR, file);
  const [lat, lon] = municipalities[name] || [null, null];

  // Insert municipality if not exists
  insertMunicipality.run(name, lat, lon);

  const { id: municipality_id } = getMunicipalityId.get(name);

  return new Promise((resolve, reject) => {
    let count = 0;
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const time = row.time;
        const co = parseFloat(row.co) || null;
        const no = parseFloat(row.no) || null;
        const no2 = parseFloat(row.no2) || null;
        const so2 = parseFloat(row.so2) || null;
        const o3 = parseFloat(row.o3) || null;

        if ([co, no, no2, so2, o3].some(x => x !== null)) {
          insertMeasurement.run(municipality_id, time, co, no, no2, so2, o3);
          count++;
        }
      })
      .on('end', () => {
        console.log(`✅ Imported ${count} rows from ${file}`);
        resolve();
      })
      .on('error', reject);
  });
}

async function importAll() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.csv'));

  for (const file of files) {
    const name = path.basename(file, '.csv').toLowerCase();
    await importCsv(file, name);
  }

  console.log('🎉 All data imported successfully.');
}

importAll();
