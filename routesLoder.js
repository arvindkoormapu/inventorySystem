const Users = require(global.appDir + '/models/users');
const mailer = require(global.appDir + '/lib/mailer')();
const Orders = require(global.appDir + '/models/orders');

module.exports = function(app) {
    app.get('/', async function(request, response) {
        response.json({"msg": "Application server is running"});
    });

    app.get('/getStatus/:orderId', async function(request, response) {
        let orders = await Orders.getOdersByOrderId(request.params.orderId);
        response.json(orders);
    });

    app.post('/updateStatus/:orderId', async function(request, response) {

        if(request.headers.name != request.body.username) {
            return response.json({"msg": "User Is Not Seller"});
        }

        try {
            let orders = await Orders.getOdersByOrderId(request.params.orderId);

            orders.description = request.body.description;
            orders.status = request.body.status;
            cancelOrDelevered = request.body.cancelOrDelevered;
            let users = await Users.getUsers(request.params.orderId);
            let res = await Orders.updateOrders({orderId: request.params.orderId}, orders);
            mailer.sendEmail(users.email, "Update Status", "\nYour Product Status Updated Successfully: " + orders.description + " " + orders.status + " " + orders.cancelOrDelevered);
            response.json({"msg": "Orders Updated Successfully!"});
        } catch (e) {
            console.log(e);
            return response.json({"msg": "Something wents wrong"});
        }
    });
}
