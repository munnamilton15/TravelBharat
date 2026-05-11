const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    stateSlug: { type: String, required: true },
    city: String,
    category: String,
    image: String,
    description: String,
    bestTime: String,
    timing: String,
    entry: String,
    nearby: String,
    destination: String,
  },
  { timestamps: true }
);

const ExperienceSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: String,
  },
  { timestamps: true }
);

module.exports = {
  Place: mongoose.model('Place', PlaceSchema),
  Experience: mongoose.model('Experience', ExperienceSchema),
};
