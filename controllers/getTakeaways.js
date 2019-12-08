const Takeaways = require('../models/takeaways')

module.exports = (req, res) => {
	console.log(Takeaways.find({}))
	Takeaways.find({})
		.then(data => {
			console.log('takeaway works')
			console.log(data)
			res.send(data)
		})
		.catch(err => {
			console.log('takeway doesnt work')
			res.send(err)
		})
}
