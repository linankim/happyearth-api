const mongoose = require('../database')

const Spots = mongoose.model('spots', {
	name: {
		type: String,
		required: true
	}
})
