const mongoose = require('../database')

const Spots = mongoose.model('spots', {
	images: {
		type: [String],
		required: true
	},
	title: {
		type: String,
		required: true
	},
	spotters: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	description: {
		type: String,
		required: true
	},
	types: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'types'
	},
	amenities: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'amenities'
	},
	city: {
		type: String,
		required: [true, 'City is required.']
	},
	country: {
		type: String,
		required: [true, 'Country is required.']
	},
	lng: {
		type: Number,
		required: true
	},
	lat: {
		type: Number,
		required: true
	}
})

module.exports = Spots
