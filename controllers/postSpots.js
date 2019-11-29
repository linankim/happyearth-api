const Spots = require('../models/spots')
const DataUri = require('datauri')
const path = require('path')
const cloudinary = require('cloudinary')
cloudinary.config({
	cloud_name: process.env.CLOUDNAME,
	api_key: process.env.APIKEY,
	api_secret: process.env.APISECRET
})

module.exports = (req, res) => {
	Spots.create(req.body)

		.then(data => {
			let uri = dataUri.format(
				path.extname(req.file.originalname).toString(),
				req.file.buffer
			).content
			cloudinary.uploader.upload(uri).then(cloudinaryFile)
			res.send({ data })
			console.log({ data })
		})
		.catch(err => res.send(err))
}
