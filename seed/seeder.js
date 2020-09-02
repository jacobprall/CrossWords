const seeder = require('mongoose-seed');
const db = require('../config/keys').mongoURI;
const clues = require('./clues');
require('../models/Word');

const data = [{
  'model': 'Word',
  'documents': clues,
}];

seeder.connect(db, () => {
  seeder.loadModels(['models/Word'])
  seeder.clearModels(['Word'], () => {
    seeder.populateModels(data, () => {
      seeder.disconnect();
    })
  })
});