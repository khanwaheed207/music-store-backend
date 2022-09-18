module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders_info", {

        orderId: { type: Sequelize.INTEGER, primaryKey: true },
        orderDate: { type: Sequelize.DATE },
        orderStatus: { type: Sequelize.STRING },
        totalItems: { type: Sequelize.INTEGER },
        itemsSubTotal: { type: Sequelize.INTEGER },
        shipmentCharges: { type: Sequelize.DOUBLE },
        totalAmount: { type: Sequelize.DOUBLE },
        paymentStatus: { type: Sequelize.STRING },
        paymentStatusTitle: { type: Sequelize.STRING },
        paymentMethod: { type: Sequelize.STRING },
        paymentMethodTitle: { type: Sequelize.STRING },
        userId: { type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        contact: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },

    });

    return Order;
};