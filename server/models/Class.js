const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Enrollment = require('./Enrollment')

const classSchema = new Schema({
   canvasSection: {
      type: String,
      required: true
   },
   classCode: {
      type: String,
      required: true,
      unique: true
   },
   totalStudents: {
      type: Number,
      default: 0
   },
   startDate: {
      type: String,
      required: true
   },
   endDate: {
      type: String,
      required: true
   },
   subject: String,
   teacher: {
      type: String,
      required: true
   },
   canvasCourse: {
      type: String,
      required: true
   },
   enrollment: {
      type: Schema.Types.ObjectId,
      ref: 'Enrollment'
   },
   canvasAddress: {
      type: String,
      required: true
   }
})

module.exports = mongoose.model('Class', classSchema)