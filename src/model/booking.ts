import mongoose, { Schema, Types } from 'mongoose'
const booking = new Schema({
  service: { 
    _id: { type: Types.ObjectId },
    name: { type: String },
    price: { type: Number },
    picture: { type: String },
    description: { type: String },
   },
   customer: {
    _id: { type: Types.ObjectId },
    fullName: { type: String },
    username: { type: String},
   },
   createdAt: { type: Date },
})
module.exports = mongoose.model('booking', booking)