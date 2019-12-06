const Orders = require(global.appDir + '/models/orders');
const Users = require(global.appDir + '/models/users');

/**
    Inserting some random data into the database.
*/

module.exports = {
    polulateData: async function () {
        let obj1 = { "name" : "Arvind", "email" : "arvind@eleven01.io", "password" : "12345", "role" : "seller", "orderId" : "" }
        let obj2 = { "name" : "Rajat", "email" : "rajat@eleven01.io", "password" : "12345", "role" : "buyer", "orderId" : "OD12345" }
        let obj3 = { "orderId" : "OD12345", "description" : "Order will be dispatch soon", "status" : "awaited", "cancelOrDelevered" : false }
        let res1 = await Users.updateUsers({email: obj1.email}, obj1);
        let res2 = await Users.updateUsers({email: obj2.email}, obj2);
        let res3 = await Orders.updateOrders({orderId: obj3.orderId}, obj3);

        console.log(res1);
        console.log(res2);
        console.log(res3)
    }
}
