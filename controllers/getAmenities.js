const Amenities = require('../models/amenities')

module.exports = (req, res) => {
	Amenities.find({})
		.then(data => {
			res.send(data)
			console.log(data)
		})
		.catch(err => {
			console.log(err)
		})
}
