require('../database')
const Spots = require('../models/spots')

module.exports = (req, res) => {
	console.log('working!!!!!!!!!')
	Spots.find(req.query)
		.populate('types')
		.then(spots => {
			spots.map(spot => {
				spot.image = spot.images[0]
				delete spot.images
				return spot
			})
			res.send(spots)
		})
		.catch(err => res.send(err))
}
