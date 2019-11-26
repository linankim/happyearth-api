//local host stuff is missing
const Users = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
	Users.findOne({ email: req.body.email })
		.select('password')
		.then(user => {
			if (user) {
				res.send('This email is already in use.')
			} else {
				req.body.password = bcrypt.hashSync(req.body.password, 10)
				console.log('req.body', req.body.password)
				Users.create(req.body)
					.then(user => {
						let token = jwt.sign(user.toObject(), process.env.SECRET)
						//{token} or token, up to you
						res.send({ token: token })
					})
					.catch(err => res.send(err))
					//review this!!!this was caught by tests
					.catch(err => {
						res.send(err)
					})
			}
		})
}
