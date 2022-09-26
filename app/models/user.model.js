module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {

    username: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    title: { type: Sequelize.STRING },
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    status: { type: Sequelize.STRING },
    contact: { type: Sequelize.STRING }

  });
  return User;
};

