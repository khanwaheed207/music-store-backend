module.exports = (sequelize, Sequelize) => {

    const Music = sequelize.define("musical_instruments", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        title: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        referance_code: { type: Sequelize.STRING },
        rating: { type: Sequelize.INTEGER },
        price: { type: Sequelize.INTEGER },
        artist: { type: Sequelize.STRING },
        artwork: { type: Sequelize.STRING },
        image_url: { type: Sequelize.STRING }
    });

    return Music;
};