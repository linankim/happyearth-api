const mongoose = require('../database')

const TypeOfPlace = mongoose.model('typeOfPlace', {
	name: {
		type: String,
		required: [true, 'TypeOfPlace is required.']
	},
	icon: {
		type: String,
		required: [true, 'Icon string is required.']
	}
})

module.exports = TypeofPlace
