const Spots = require('../models/spots')

module.exports = (req, res) => {
	Spots.find({})
		.select('city')
		.then(data => {
			// filter data, only return spots where city === req.query.name
			// remove duplicates
			console.log({ data })
			res.send(data)
		})
		.catch(err => {
			console.log(err)
			res.send(err)
		})
}
