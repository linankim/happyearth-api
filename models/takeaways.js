const mongoose = require('../database')

const Takeaways = mongoose.model('takeaways', {
	explanation: {
		type: String,
		required: [true, 'explanation is required.']
	},
	icon: {
		type: String,
		required: [true, 'Icon string is required.']
	},
	clicked: {
		type: Boolean,
		default: false
	}
})

module.exports = Takeaways
