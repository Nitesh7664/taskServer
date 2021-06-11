const mongoose = require('mongoose')
const Enrollment = require('./Enrollment')
const Schema = mongoose.Schema

const studentSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
      select: false
   },
   isCanvasUser: {
      type: Boolean,
      default: true,
   },
   status: {
      type: Number,
      default: 1
   },
   enrollments: [{
      type: Schema.Types.ObjectId,
      ref: 'Enrollment'
   }]
})

module.exports = mongoose.model('Student', studentSchema)