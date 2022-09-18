const db = require("../models");
const Op = db.Sequelize.Op;
const Instrument = db.instrument;


// Create and Save a Instruments
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Instruments Content can not be empty!"
        });
        return;
    }

    // Create a musics instruments
    const instrument = {
        title: req.body.title,
        description: req.body.description,
        referance_code: req.body.referance_code,
        rating: req.body.rating,
        price: req.body.price,
        artist: req.body.artist,
        artwork: req.body.artwork,
        image_url: req.body.image_url,
    };

    // Save musics instruments in the database
    Instrument.create(instrument)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the musics instruments."
            });
        });
};

// Retrieve all musics instruments from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;

    Instrument.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving musics instruments."
            });
        });
};

// Retrieve all musics instruments from the database.
exports.topInstruments = (req, res) => {
    Instrument.findAll({ where: null, limit: 8, offset: 0, })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving musics instruments."
            });
        });
};

// Find a single music with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Instrument.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Music with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Music with id=" + id
            });
        });
};

// Update a music by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Instrument.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Music was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Music with id=${id}. Maybe Music was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Music with id=" + id
            });
        });
};

// Delete a music with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Instrument.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Music was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Music with id=${id}. Maybe Music was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Music with id=" + id
            });
        });
};

// Delete all musics instruments from the database.
exports.deleteAll = (req, res) => {
    Instrument.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Music were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Music."
            });
        });
};