const Sequelize = require("sequelize");
const dbConfig =
  require("../config").database[process.env.NODE_ENV || "development"];

const db = {};

let sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}
// ** Models
// *> User Models
db.Users = require(__dirname + "/../models/Users/Users.js")(
  sequelize,
  Sequelize
);
// *> Admin Models
db.Admins = require(__dirname + "/../models/Admins/Admins.js")(
  sequelize,
  Sequelize
);
// *> Followeds Models
db.Followeds = require(__dirname + "/../models/Followeds/Followeds.js")(
  sequelize,
  Sequelize
);
// *> Posts Models
db.Posts = require(__dirname + "/../models/Posts/Posts.js")(
  sequelize,
  Sequelize
);
// *> Posts Models
db.Messages = require(__dirname + "/../models/Messages/Messages.js")(
  sequelize,
  Sequelize
);
// *> Watch Models
db.Watch = require(__dirname + "/../models/Watch/Watch.js")(
  sequelize,
  Sequelize
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Users => Followeds
db.Users.hasMany(db.Followeds, {
  foreignKey: "user_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Followeds.belongsTo(db.Users, {
  foreignKey: "user_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
//Users => Followers
db.Users.hasMany(db.Followeds, {
  foreignKey: "follower_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Followeds.belongsTo(db.Users, {
  foreignKey: "user_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
//Users => Posts
db.Users.hasMany(db.Posts, {
  foreignKey: "user_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Posts.belongsTo(db.Users, {
  foreignKey: "user_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
 //Users => Messages
db.Users.hasMany(db.Messages, {
  foreignKey: "user_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Messages.belongsTo(db.Users, {
  foreignKey: "user_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
 //Users => Messages
 db.Users.hasMany(db.Messages, {
  foreignKey: "sender_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Messages.belongsTo(db.Users, {
  foreignKey: "user_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
 //Users => Watchs
 db.Users.hasMany(db.Watch, {
  foreignKey: "user_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Watch.belongsTo(db.Users, {
  foreignKey: "user_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});

// ** Creatings

/*
db.Screens.create({
  screen_id: 1,
});
*/

module.exports = db;
