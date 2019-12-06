const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema  = new Schema({
    orderId: {
		type: String,
        uniqe: true
	},
    description: {
		type: String
	},
	status: {
		type: String
	},
    cancel: {
		type: Boolean,
		default: false
	}
});


const Orders = module.exports = mongoose.model('Orders', OrdersSchema);

module.exports.getOdersByOrderId = async function(orderId) {
    return await Orders.findOne({orderId: orderId});
}

module.exports.updateOrders = async function(query, update) {
	return await Orders.findOneAndUpdate(query, update, { upsert: true, new: true, runValidators: true, useFindAndModify: false });
}
