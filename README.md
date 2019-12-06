# Inventory Management System  

This project contains the REST API for updating the order status at every stage of processing, tools I have uses for developing this application is nodeJS for API and MongoDB for polulating data.

## Instructions

This is only for the prototype model and probably unsuitable for production.

### Requirments And System Dependency

- nodejs v8.0+
- npm 5.5+
- node-gyp v3.6.2+
- mongodb v4.0.13+

### Configuration

All the configurating of project will be inside the .env file.
- PORT=8081
- EMAIL=xxx@gmail.com
- PASSWORD=xxxxxxxxx

### What's included

Basic routes for updating order history                     <br/>

Update Orders      POST     /updateStatus/:orderId          <br />
```
API URL: http://localhost:8081/updateStatus/OD12345
End Point: /updateStatus/:orderId
Method: POST
Payload: { "orderId" : "OD12345", "description" : "Order will be dispatch soon", "status" : "Pending", "cancelOrDelevered" : false }

Response: Success
```
GET OrderStatus    GET      /getStatus                      <br/>
```
API URL: http://localhost:8081/getStatus/OD12345
End Point: /updateStatus/:orderId
Method: POST
Payload: { "orderId" : "OD12345", "description" : "Order will be dispatch soon", "status" : "Pending", "cancelOrDelevered" : false }

Response: {
    "_id": "5de797268a2363f472607e1f",
    "orderId": "OD12345",
    "description": "Order will be dispatch soon",
    "status": "awaited",
    "cancelOrDelevered": false
}
```

Several routes are protected and require JWT tokens, which can be generated using the login route. You will need to create a user by sending a post request to the createUser route.

### To run application

```
$ node index.js or npm start
```

While starting application will automatically insert required data into the mongo database. 
