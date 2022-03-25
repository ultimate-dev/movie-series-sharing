module.exports = (sequelize, Sequelize) => {
  return sequelize.define("messages", {
    message_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sender_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    read: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
