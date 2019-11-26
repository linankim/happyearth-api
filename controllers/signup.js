//local host stuff is missing
const Users = require('../models/users')

module.exports = (req, res) => {
	Users.create(req.body)
		.then(user => res.send(user))
		.catch(err => res.send(err))
}
