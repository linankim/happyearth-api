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
				let cityList = spotsCopy.map(spot => spot.city)
				let onlyUnique = (value, index, self) => {
					return self.indexOf(value) === index
				}
				let unique = cityList.filter(onlyUnique)
				console.log({ unique })
				res.send(unique)
			}
		})
		.catch(err => {
			console.log(err)
			res.send(err)
		})
}
