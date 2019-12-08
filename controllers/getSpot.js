const Spots = require('../models/spots')

module.exports = (req, res) => {
	console.log('connected')
	Spots.findById(req.params.id)
		.populate('users eatin takeaway types')
		.lean()
		.then(data => {
			console.log('req.params.id', req.params.id)
			res.send(data)
			console.log(data)
		})
		.catch(err => res.send(err))
}
