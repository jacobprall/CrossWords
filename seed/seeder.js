import seeder from 'mongoose-seeder';
const fs = require('fs');
const db = require('../config/keys').mongoURI;

fs.readFile('./clues.json', 'utf8', (err, jsonData) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    const clues = JSON.parse(jsonData);
  } catch (err) {
    console.log('Error parsing JSON string:', err);
  }
});

const data = {
  'model': 'Word',
  'documents': clues,
}


seeder.connect(db, () => {
  seeder.loadModels([
    '../models/Word.js'
  ]);
  seeder.clearModels(['Word'], () => {
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});