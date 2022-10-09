import * as mongoose from 'mongoose'
const service = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  picture: { type: String },
  description: { type: String },
})
module.exports = mongoose.model('service', service)