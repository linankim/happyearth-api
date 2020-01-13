const Spots = require('../models/spots')

module.exports = (req, res) => {
	Spots.findByIdAndDelete({ _id: req.params.id })
		.then(data => {
			res.send(data)
		})
		.catch(err => {
			res.send(err)
		})
}
