const Users = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
	Users.findOne({ email: req.body.email })
		.select('email password')
		.then(user => {
			if (!user) {
				res.send('Either email or password is incorrect')
			} else {
				let match = bcrypt.compareSync(req.body.password, user.password)
				if (!match) {
					res.send('Either email or password is incorrect')
				} else {
					let token = jwt.sign(user.toObject(), process.env.SECRET)
					res.send({ token })
				}
			}
		})
		.catch(err => res.send(err))
}
