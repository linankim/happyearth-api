//local host stuff is missing
const Users = require('../models/users')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
	if (req.body.password) {
		req.body.password = bcrypt.hashSync(req.body.password, 10)
	} else {
		res.send({ error: 'password is required' })
	}
	Users.findOne({ email: req.body.email }).then(user => {
		if (user) {
			res.send('This email is already in use.')
		} else {
			req.body.password = bcrypt.hashSync(req.body.password, 10)
		}
	})
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
