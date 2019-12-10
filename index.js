const express = require('express')
const app = express()
require('dotenv').config()
const multer = require('multer')

//connect database
require('./database')

//middleware
const bodyParser = require('body-parser')
const cors = require('cors')
const upload = multer({ storage: multer.memoryStorage() })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ credentials: true }))

//routes delete
app.delete('/users/:id', require('./controllers/deleteUser'))

//routes get
app.get('/amenities', require('./controllers/getAmenities'))
app.get('/auth', require('./controllers/Auth'))
app.get('/cities', require('./controllers/getCities'))
app.get('/eatins', require('./controllers/getEatins'))
app.get('/spots/:id', require('./controllers/getSpot'))
app.get('/spots', require('./controllers/getSpots'))
app.get('/takeaways', require('./controllers/getTakeaways'))
app.get('/types', require('./controllers/getTypes'))
app.get('/users/:id', require('./controllers/getUser'))
app.get('/users', require('./controllers/getUsers'))

//routes patch
app.patch(
	'/users/:id',
	upload.single('file'),
	require('./controllers/patchUser')
)
app.patch('/spots/:id', require('./controllers/patchSpot'))

//routes post
app.post('/login', require('./controllers/Login'))
app.post('/signup', upload.single('file'), require('./controllers/signup'))
app.post('/spots', upload.array('files'), require('./controllers/postSpots'))

//connect server
app.listen(process.env.PORT, () => {
	console.log(`Ready on port ${process.env.PORT}`)
})

//exports
module.exports = app
