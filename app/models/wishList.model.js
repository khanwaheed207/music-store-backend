module.exports = (sequelize, Sequelize) => {
    const wishList = sequelize.define("wishList_info", {

        id: { type: Sequelize.INTEGER, primaryKey: true },
        wishItem: { type: Sequelize.STRING },
        price: { type: Sequelize.INTEGER },
        quantity: { type: Sequelize.INTEGER },

    });

    return wishList;
};