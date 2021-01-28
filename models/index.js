const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/database');
var DataTypes = require("sequelize").DataTypes;
var _address = require("./Address");
var _book = require("./Book");
var _chapter = require("./Chapter");
var _meeting = require("./Meeting");
var _user = require("./User");
var _user_has_meeting = require("./User_has_meeting");
var _user_like_book = require("./User_like_book");

function index(sequelize) {
    var Address = _address(sequelize, DataTypes);
    var Book = _book(sequelize, DataTypes);
    var Chapter = _chapter(sequelize, DataTypes);
    var Meeting = _meeting(sequelize, DataTypes);
    var User = _user(sequelize, DataTypes);
    var User_has_meeting = _user_has_meeting(sequelize, DataTypes);
    var User_like_book = _user_like_book(sequelize, DataTypes);

    Book.belongsTo(User, { foreignKey: "user_id" });
    User.hasMany(Book, { foreignKey: "user_id" });
    Chapter.belongsTo(Book, { foreignKey: "book_id" });
    Book.hasMany(Chapter, { foreignKey: "book_id" });
    Meeting.belongsTo(User, { foreignKey: "user_id" });
    User.hasMany(Meeting, { foreignKey: "user_id" });
    User.belongsTo(Address, { foreignKey: "address_id" });
    Address.hasOne(User, { foreignKey: "address_id" });
    Meeting.hasMany(User_has_meeting, { foreignKey: "meeting_id" });
    User_has_meeting.belongsTo(Meeting, { foreignKey: "meeting_id" });
    User_has_meeting.belongsTo(User, { foreignKey: "user_id" });
    User.hasMany(User_has_meeting, { foreignKey: "user_id" });
    User_like_book.belongsTo(Book, { foreignKey: "book_id" });
    Book.hasMany(User_like_book, { foreignKey: "book_id" });
    User_like_book.belongsTo(User, { foreignKey: "user_id" });
    User.hasMany(User_like_book, { foreignKey: "user_id" });

    return {
        Address,
        Book,
        Chapter,
        Meeting,
        User,
        User_has_meeting,
        User_like_book,
        sequelize
    };
}

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
module.exports = index(sequelize);
module.exports.index = index(sequelize);
module.exports.default = index(sequelize);