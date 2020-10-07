// models/wine.js

const mongoose = require('mongoose');

const wineSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    liked: Number,
    variety: String,
    vintage: String,
    country: String,
    province: String,
    price: String,
    popular: Number,
    description: String,
    flavors: [{
        flavors: [String],
        fruitname: [String]
    }]
}, {collection: "wine"});

module.exports = mongoose.model('Wine', wineSchema);