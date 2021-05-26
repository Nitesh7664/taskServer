const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Student = require('./Student')
const Class = require('./Class')

const enrollmentSchema = new Schema({
   class: {
      type: Schema.Types.ObjectId,
      ref: 'Class'
   },
   students: [{
      type: Schema.Types.ObjectId,
      ref: 'Student'
   }]
})


module.exports = mongoose.model('Enrollment', enrollmentSchema)