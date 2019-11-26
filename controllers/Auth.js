const Users = require('../models/users')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
	let token = req.headers.authorization.split(' ')[1]
	let verifiedUser = jwt.verify(token, `${process.env.SECRET}`)
	console.log('verifiedUser', verifiedUser)
	Users.findOne({ email: verifiedUser.email })
		.then(user => {
			if (!verifiedUser) {
				res.send('Token not valid')
			} else {
				console.log('auth')
				res.send(user)
				console.log(user)
			}
		})
		.catch(err => console.log(err))
}
