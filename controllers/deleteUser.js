const Users = require('../models/users')

module.exports = (req, res) => {
	Users.findByIdAndDelete({ _id: req.params.id })
		.then(data => {
			res.send(data)
		})
		.catch(error => {
			res.send(error)
			console.log('not working')
		})
}
