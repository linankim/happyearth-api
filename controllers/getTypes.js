const Types = require('../models/types')

module.exports = (req, res) => {
	Types.find({})
		.then(data => {
			console.log('yes')
			res.send(data)
			console.log(data)
		})
		.catch(err => {
			console.log(err)
		})
}
