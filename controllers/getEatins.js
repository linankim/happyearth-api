const Eatins = require('../models/eatins')

module.exports = (req, res) => {
	Eatins.find({})
		.then(data => {
			console.log('works')
			res.send(data)
		})
		.catch(err => {
			console.log('no')
			res.send(err)
		})
}
