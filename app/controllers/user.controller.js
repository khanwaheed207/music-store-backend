const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: {
            [Op.like]: `%${username}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving musics instruments."
            });
    });
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.artistBoard = (req, res) => {
    res.status(200).send("artist Content.");
};