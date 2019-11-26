const mongoose = require('../database')

const Amenities = mongoose.model('amenities', {
	explanation: {
		type: String,
		required: [true, 'Amenity is required.']
	},
	icon: {
		type: String,
		required: [true, 'Icon string is required.']
	}
})

module.exports = Amenities
