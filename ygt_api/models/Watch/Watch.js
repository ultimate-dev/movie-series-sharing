module.exports = (sequelize, Sequelize) => {
  return sequelize.define("watchs", {
    watch_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    watch: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    source_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });
};
