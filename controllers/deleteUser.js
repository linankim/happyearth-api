const Users = require('../models/users')

module.exports = (req, res) => {
	console.log('works')
	Users.findByIdAndDelete({ _id: req.params.id })
		.then(data => {
			console.log(data)
			res.send(data)
		})
		.catch(error => {
			res.send(error)
			console.log('not working')
		})
}
