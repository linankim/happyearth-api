const Users = require('../models/users')
const DataUri = require('datauri')
const path = require('path')
const cloudinary = require('cloudinary')

module.exports = (req, res) => {
	Users.findById({ _id: req.params.id })
		.then(data => {
			if (req.file) {
				cloudinary.config({
					cloud_name: process.env.CLOUDNAME,
					api_key: process.env.APIKEY,
					api_secret: process.env.APISECRET
				})
				const dataUri = new DataUri()
				let uri = dataUri.format(
					path.extname(req.file.originalname).toString(),
					req.file.buffer
				).content
				cloudinary.uploader
					.upload(uri)
					.then(cloudinaryFile => {
						console.log({ cloudinaryFile })
						req.body.avatar = cloudinaryFile.url
						Users.findByIdAndUpdate({ _id: req.params.id }, req.body, {
							new: true
						})
							.then(data => {
								res.send(data)
							})
							.catch(err => {
								console.log(err)
								res.send(err)
							})
					})
					.catch(err => res.send(err))
			} else {
				Users.findByIdAndUpdate({ _id: req.params.id }, req.body, {
					new: true
				})
					.then(data => {
						res.send(data)
					})
					.catch(err => {
						console.log(err)
						res.send(err)
					})
			}
		})
		.catch(err => {
			res.send(error)
			console.log(err)
		})
}
