const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('dotenv').config();
const mongoose = require('mongoose');
const { Place } = require('./models');
const { seedPlaces } = require('./data');

(async () => {
  const MONGODB_URI = process.env.MONGODB_URI || process.env.VITE_MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('❌ Set MONGODB_URI or VITE_MONGODB_URI in .env first.');
    process.exit(1);
  }
  await mongoose.connect(MONGODB_URI);
  console.log('Connected. Seeding…');
  await Place.deleteMany({});
  await Place.insertMany(seedPlaces);
  console.log(`✅ Inserted ${seedPlaces.length} places`);
  await mongoose.disconnect();
  process.exit(0);
})();
