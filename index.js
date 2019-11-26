const express = require('express')
const app = express()
require('dotenv').config()
//connect database
require('./database')
//middleware
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ credentials: true }))
//routes
app.post('/signup', require('./controllers/Signup.js'))
app.listen(process.env.PORT, () => {
	console.log(`Ready on port ${process.env.PORT}`)
})
//exports
module.exports = app
