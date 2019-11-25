const mongoose = require('../database')

const Users = mongoose.model('users', {
	name: {
		type: String,
		required: [true, 'name is required']
	}
})
