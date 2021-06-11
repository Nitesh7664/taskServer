const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();


const PORT = process.env.PORT || 5000
mongoose.connect('mongodb://localhost:27017/school', () => {
   console.log("database Connected")
   app.listen(PORT, () => console.log(`server running on port ${PORT}`))
})

app.use(cors())
app.use(express.json())
app.use(require('./routes/class'))
app.use(require('./routes/student'))


