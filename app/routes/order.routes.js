const { authJwt } = require("../middleware");
const orderCtrl = require("../controllers/order.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Get all orders
    app.get("/api/order", [authJwt.verifyToken], musicCtrl.findAll);

    // Get orders by id
    app.get( "/api/order/:id", [authJwt.verifyToken], musicCtrl.findOne );

    // Post orders
    app.post( "/api/order", [authJwt.verifyToken], musicCtrl.create );

    // Delete orders
    app.delete("/api/order", [authJwt.verifyToken], musicCtrl.delete );

};