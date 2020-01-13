const Spots = require('../models/spots')
const DataUri = require('datauri')
const path = require('path')
const cloudinary = require('cloudinary')

module.exports = (req, res) => {
	req.body.center = {}
	req.body.center.lat = req.body.lat
	req.body.center.lng = req.body.lng

	if (req.files) {
		console.log('files', req.files)
		cloudinary.config({
			cloud_name: process.env.CLOUDNAME,
			api_key: process.env.APIKEY,
			api_secret: process.env.APISECRET
		})
		const dataUri = new DataUri()
		uploadFile = file => {
			return new Promise(function(resolve, reject) {
				let uri = dataUri.format(
					path.extname(file.originalname).toString(),
					file.buffer
				).content
				console.log({ file })
				cloudinary.uploader
					.upload(uri)
					.then(cloudinaryFile => {
						resolve(cloudinaryFile.url)
						// req.body.images = []
						// req.body.images.push(cloudinaryFile.url)
					})
					.catch(err => res.send(err))
			})
		}

		let uploadedFiles = req.files.map(file => {
			return uploadFile(file)
		})

		Promise.all(uploadedFiles).then(arrayOfFileUrls => {
			console.log({ arrayOfFileUrls })
			req.body.images = arrayOfFileUrls
			Spots.create(req.body)
				.then(spot => {
					console.log({ spot })
					res.send({ spot })
				})
				.catch(err => {
					console.log({ err })
					res.send(err)
				})
		})
	} else {
		Spots.create(req.body)
			.then(spot => {
				res.send({ spot })
			})
			.catch(err => res.send(err))
	}
}
