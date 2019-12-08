const mongoose = require('../database')

const Takeaway = mongoose.model('takeaway', {
	explanation: {
		type: String,
		required: [true, 'explanation is required.']
	},
	icon: {
		type: String,
		required: [true, 'Icon string is required.']
	}
})

module.exports = Takeaway
