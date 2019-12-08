const mongoose = require('../database')

const Eatin = mongoose.model('eatin', {
	explanation: {
		type: String,
		required: [true, 'explanation is required.']
	},
	icon: {
		type: String,
		required: [true, 'Icon string is required.']
	}
})

module.exports = Eatin
