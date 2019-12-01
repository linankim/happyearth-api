const Spots = require('../models/spots')
const DataUri = require('datauri')
const path = require('path')
const cloudinary = require('cloudinary')

module.exports = (req, res) => {
	req.body.center = {}
	req.body.center.lat = req.body.lat
	req.body.center.lng = req.body.lng
	console.log('body', JSON.stringify(req.body, false, 2))
	if (req.files && req.files.length) {
		cloudinary.config({
			cloud_name: process.env.CLOUDNAME,
			api_key: process.env.APIKEY,
			api_secret: process.env.APISECRET
		})
		const dataUri = new DataUri()
		let uri = dataUri.format(
			path.extname(req.files[0].originalname).toString(),
			req.files[0].buffer
		).content
		cloudinary.uploader.upload(uri).then(cloudinaryFile => {
			req.body.images = []
			req.body.images[0] = cloudinaryFile.url
			Spots.create(req.body)
				.then(spot => {
					res.send({ spot })
					console.log({ spot })
				})
				.catch(err => res.send(err))
		})
	} else {
		console.log('no file')
		Spots.create(req.body)
			.then(spot => {
				res.send({ spot })
				console.log({ spot })
			})
			.catch(err => res.send(err))
	}
}
