const {Schema, model, Types} = require('mongoose');

const schema = new Schema(
	{
		name: {type: String},
		lastName: {type: String},
		email: {type: String, required: true},
		owner: {type: String}
	},
	{ 
		collection : 'Profile'
	}
);

module.exports = model('Profile', schema)