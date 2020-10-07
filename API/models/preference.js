// models/user.js

const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    flavors: [String],
    fruits: [String],
    priceRange: Number
});

module.exports = mongoose.model('Preference', preferenceSchema);