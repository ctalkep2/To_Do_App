const {Schema, model, Types} = require('mongoose');

const schema = new Schema(
	{
		task: {type: String},
		complited: {type: Boolean},
		owner: {type: String},
		priority: {type: Number},
		date: {type: Number}
	},
	{ 
		collection : 'Task'
	}
);

module.exports = model('Task', schema)