const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema  = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String
	},
    orderId: {
		type: String
	},
});

const Users = module.exports = mongoose.model('Users', UsersSchema);

module.exports.getUsers = async function(orderId) {
    return await Users.findOne({orderId: orderId});
}

module.exports.updateUsers = async function(query, update) {
	return await Users.findOneAndUpdate(query, update, { upsert: true, new: true, runValidators: true, useFindAndModify: false });
}
