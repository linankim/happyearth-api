const Users = require('../models/users')

module.exports = (req, res) => {
	console.log('works')
	Users.findByIdAndDelete({ _id: req.params.id })
		.then(data => {
			res.send(data)
			console.log(data)
		})
		.catch(error => {
			res.send(error)
			console.log('not working')
		})
}
