const Users = require('../models/users')

module.exports = (req, res) => {
	Users.findById(req.params.id)
		.select('firstName lastName avatar')
		.then(user => {
			console.log(user)
			res.send(user)
		})
		.catch(err => {
			console.log(err)
		})
}
