const mongoose = require('../database')

const Eatins = mongoose.model('eatins', {
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

module.exports = Eatins
