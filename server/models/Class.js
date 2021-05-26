const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Enrollment = require('./Enrollment')

const classSchema = new Schema({
   className: {
      type: String,
      required: true
   },
   classCode: {
      type: String,
      required: true
   },
   totalStudents: Number,
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
   canvasCourse: String,
   enrollment: {
      type: Schema.Types.ObjectId,
      ref: 'Enrollment'
   }
})

module.exports = mongoose.model('Class', classSchema)