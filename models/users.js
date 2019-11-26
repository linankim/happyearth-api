const mongoose = require('../database')

const Users = mongoose.model('users', {
	firstName: {
		type: String,
		required: [true, 'First name is required']
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required']
	},
	residenceCountry: {
		type: String,
		required: [true, 'Country of Residence is required']
	},
	email: {
		type: String,
		required: [true, 'Email is required']
	},
	password: {
		type: String,
		required: [true, 'Password is required']
	},
	avatar: String
})

module.exports = Users
