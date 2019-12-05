const Users = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const DataUri = require('datauri')
const path = require('path')
const cloudinary = require('cloudinary')

module.exports = (req, res) => {
	console.log('req', req.body)
	console.log('req.body.email', req.body.email)
	Users.findOne({ email: req.body.email })
		.select('password')
		.then(user => {
			if (user) {
				res.send('This email is already in use.')
				console.log('stop here')
			} else {
				req.body.password = bcrypt.hashSync(req.body.password, 10)
				console.log('encrypted password', req.body.password)

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
					cloudinary.uploader.upload(uri).then(cloudinaryFile => {
						console.log({ cloudinaryFile })
						req.body.avatar = cloudinaryFile.url

						Users.create(req.body)
							.then(user => {
								let token = jwt.sign(user.toObject(), process.env.SECRET)

								res.send({ token: token })
							})
							.catch(err => res.send(err))
					})
				} else {
					console.log('something')
				}
			}
		})
		.catch(err => {
			res.send(err)
		})
}
