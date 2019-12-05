const Users = require('../models/users')

module.exports = (req, res) => {
	Users.find({})
		.then(data => {
			res.send(data)
		})
		.catch(err => {
			res.send(err)
		})
}
