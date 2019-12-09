const Spots = require('../models/spots')

module.exports = (req, res) => {
	Spots.find({})
		.select('city')
		.then(spots => {
			let spotsCopy = []
			spots.forEach(spot => {
				if (
					spot.city.toLowerCase().indexOf(req.query.name.toLowerCase()) != -1
				) {
					spotsCopy.push(spot)
				}

				// filter data, only return spots where city === req.query.name
				// remove duplicates
			})
			if (spotsCopy) {
				let spotsOne = []
				spotsOne.push(spotsCopy[0])
				spotsCopy.filter(spot => {
					for (i = 0; i < spotsOne.length; i++) {
						if (spot.city !== spotsOne[i].city) {
							spotsOne.push(spot)
						}
					}
				})

				console.log({ spotsOne })
				res.send(spotsOne)
			}
		})
		.catch(err => {
			console.log(err)
			res.send(err)
		})
}
