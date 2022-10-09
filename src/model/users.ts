const mongoose = require('mongoose')
const users = new mongoose.Schema({
  fullName: { type: String },
  username: { type: String, unique: true },
  password: { type: String },
  createdAt: { type: Date },
})
module.exports = mongoose.model('users', users)