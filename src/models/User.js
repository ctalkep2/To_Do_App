const {Schema, model, Types} = require('mongoose');

const schema = new Schema(
	{
		email: {type: String, required: true, unique: true},
		password: {type: String, required: true}
	},
	{ 
		collection : 'Users'
	}
);

module.exports = model('Users', schema)