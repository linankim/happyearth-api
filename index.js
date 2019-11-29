const express = require('express')
const app = express()
require('dotenv').config()

//connect database
require('./database')

//middleware
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ credentials: true }))

//routes get
app.get('/amenities', require('./controllers/getAmenities'))
app.get('/auth', require('./controllers/Auth'))
app.get('/spots', require('./controllers/getSpots'))
app.get('/types', require('./controllers/getTypes'))
app.get('/spots/:id', require('./controllers/getSpot'))

//routes post
app.post('/login', require('./controllers/Login'))
app.post('/signup', require('./controllers/Signup'))
app.post('/spots', upload.array('file'), require('./controllers/postSpots'))

//connect server
app.listen(process.env.PORT, () => {
	console.log(`Ready on port ${process.env.PORT}`)
})

//exports
module.exports = app
