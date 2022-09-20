const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // users
    app.get("/api/users", [authJwt.verifyToken], controller.findAll);
    app.put("/api/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
    app.delete("/api/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
    
    // access verification
    app.get("/api/all", controller.allAccess);
    app.get("/api/artist", [authJwt.verifyToken, authJwt.isArtist], controller.artistBoard);
    app.get("/api/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};