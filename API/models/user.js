// models/user.js

const mongoose = require('mongoose');
const preferenceSchema = require('./preference').schema;

const recommendationSchema = new mongoose.Schema({
  _id: { type : mongoose.Schema.Types.ObjectId, ref: 'Wine' },
  score: String
})

mongoose.model("Recommendation", recommendationSchema);

const userSchema = new mongoose.Schema({
    pseudo: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    wineLiked: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Wine' }],
    notLiked: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Wine' }],
    wineLikedR: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Wine' }],
    wineLikedK: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Wine' }],
    preference: preferenceSchema,
    recommendationWineCB: [{
      wine: { type : mongoose.Schema.Types.ObjectId, ref: 'Wine'}, 
      score: String
    }],
});

module.exports = mongoose.model('User', userSchema);