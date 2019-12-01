const mongoose = require('../database')

const Types = mongoose.model('types', {
	name: {
		type: String,
		required: [true, 'Name is required.']
	},
	icon: {
		type: String,
		required: [true, 'Icon string is required.']
	}
})

module.exports = Types
