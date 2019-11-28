const mongoose = require('../database')

const Types = mongoose.model('types', {
	name: {
		type: String
	},
	icon: {
		type: String,
		required: true
	}
})

module.exports = Types
