const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.user;

// Create and Save User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "User Content can not be empty!"
        });
        return;
    }

    // Create a user
    const user = {
        title: req.body.title,
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        status: req.body.status,
        contact: req.body.contact,
    };

    // Save user in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
};

// Find all users
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? {
        username: {
            [Op.like]: `%${username}%`
        }
    } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Users."
            });
        });
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.artistBoard = (req, res) => {
    res.status(200).send("artist Content.");
};

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};