const Spots = require('../models/spots')

module.exports = (req, res) => {
	Spots.find({})
		.select('city')
		.then(spots => {
			let spotsCopy = []
			spots.forEach(spot => {
				if (spot.city.indexOf(req.query.name) != -1) {
					spotsCopy.push(spot)
				}

				// filter data, only return spots where city === req.query.name
				// remove duplicates
			})
			if (spotsCopy) {
				spotsOne = []
				spotsOne.push(spotsCopy[0])
				console.log({ spotsOne })
				res.send(spotsOne)
			}
		})
		.catch(err => {
			console.log(err)
			res.send(err)
		})
}
