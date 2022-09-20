const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

let response =  { status : "SUCCESS", timestamp: new Date(), message:""};


verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    response.message = "Unauthenticated user : Access denied, Token not found.";
    response.status = "FAILED";
    return res.status(403).send(response);
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      response.message = "Unauthenticated user : Access denied, Invalid access token.";
      response.status = "FAILED";
      return res.status(401).send(response);
    }

    if (!decoded.id) {
      response.message = "Unauthenticated user : Access denied, Invalid access token.";
      response.status = "FAILED";
      return res.status(401).send(response);
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "ROLE_ADMIN") {
          next();
          return;
        }
      }
      response.message = "Unautherised user : Access denied, Require Admin Role!";
      response.status = "FAILED";
      res.status(403).send(response);
      return;
    });
  });
};

isArtist = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "ROLE_ARTIST") {
          next();
          return;
        }
      }
      response.message = "Unautherised user : Access denied, Require Artist Role!";
      response.status = "FAILED";
      res.status(403).send(response);
    });
  });
};

isArtistOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "ROLE_ARTIST") {
          next();
          return;
        }

        if (roles[i].name === "ROLE_ADMIN") {
          next();
          return;
        }
      }

      response.message = "Unautherised user : Access denied, Require Artist or Admin Role!";
      response.status = "FAILED";
      res.status(403).send(response);
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isArtist: isArtist,
  isArtistOrAdmin: isArtistOrAdmin
};
module.exports = authJwt;
