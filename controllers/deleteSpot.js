const Spots = require('../models/spots')

module.exports = (req, res) => {
	console.log('works')
	Spots.findByIdAndDelete({ _id: req.params.id })
		.then(data => {
			res.send(data)
		})
		.catch(err => {
			res.send(err)
		})
}
