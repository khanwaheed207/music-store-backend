const { authJwt } = require("../middleware");
const instrumentsCtrl = require("../controllers/instrument.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/instruments/:id", [authJwt.verifyToken], instrumentsCtrl.findOne);
    app.get("/api/instruments", [authJwt.verifyToken], instrumentsCtrl.findAll);
    app.get("/api/top/instruments", instrumentsCtrl.topInstruments);
    app.post("/api/instruments", [authJwt.verifyToken], instrumentsCtrl.create);
    app.put("/api/instruments", [authJwt.verifyToken], instrumentsCtrl.update);
    app.delete("/api/instruments/:id", [authJwt.verifyToken], instrumentsCtrl.delete);

};