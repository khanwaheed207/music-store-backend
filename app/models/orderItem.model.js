module.exports = (sequelize, Sequelize) => {
    const orderItem = sequelize.define("order_item", {

        orderItemId: { type: Sequelize.INTEGER, primaryKey: true },
        orderId: { type: Sequelize.INTEGER },
        productId: { type: Sequelize.INTEGER },
        productCode: { type: Sequelize.INTEGER },
        productImg: { type: Sequelize.STRING },
        productTitle: { type: Sequelize.STRING },
        productDescription: { type: Sequelize.STRING },
        productCategory: { type: Sequelize.STRING },
        price: { type: Sequelize.INTEGER },
        quantity: { type: Sequelize.INTEGER },
        totalPrice: { type: Sequelize.INTEGER },

    });

    return orderItem;
};