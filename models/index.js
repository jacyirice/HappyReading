const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/database');
var DataTypes = require("sequelize").DataTypes;
var _address = require("./Address");
var _address_meeting = require("./Address_meeting");
var _book = require("./Book");
var _chapter = require("./Chapter");
var _meeting = require("./Meeting");
var _swap = require("./Swap");
var _user = require("./User");
var _user_has_meeting = require("./User_has_meeting");
var _user_has_swap = require("./User_has_swap");

function index(sequelize) {
    var Address = _address(sequelize, DataTypes);
    var Address_meeting = _address_meeting(sequelize, DataTypes);
    var Book = _book(sequelize, DataTypes);
    var Chapter = _chapter(sequelize, DataTypes);
    var Meeting = _meeting(sequelize, DataTypes);
    var Swap = _swap(sequelize, DataTypes);
    var User = _user(sequelize, DataTypes);
    var User_has_meeting = _user_has_meeting(sequelize, DataTypes);
    var User_has_swap = _user_has_swap(sequelize, DataTypes);
    Book.belongsTo(User, { foreignKey: "user_id" });
    User.hasMany(Book, { foreignKey: "user_id" });
    Chapter.belongsTo(Book, { foreignKey: "book_id" });
    Book.hasMany(Chapter, { foreignKey: "book_id" });
    Meeting.belongsTo(Address_meeting, { foreignKey: "address_meeting_id" });
    Address_meeting.hasOne(Meeting, { foreignKey: "address_meeting_id" });
    Meeting.belongsTo(Book, { foreignKey: "book_id" });
    Book.hasMany(Meeting, { foreignKey: "book_id" });
    Meeting.belongsTo(User, { foreignKey: "user_id" });
    User.hasMany(Meeting, { foreignKey: "user_id" });
    Swap.belongsTo(Book, { foreignKey: "book_id" });
    Book.hasMany(Swap, { foreignKey: "book_id" });
    Swap.belongsTo(Book, { foreignKey: "swap_book_id" });
    Book.hasMany(Swap, { foreignKey: "swap_book_id" });
    Swap.belongsTo(User, { foreignKey: "swap_with_id" });
    User.hasMany(Swap, { foreignKey: "swap_with_id" });
    Swap.belongsTo(User, { foreignKey: "user_id" });
    User.hasMany(Swap, { foreignKey: "user_id" });
    User.belongsTo(Address, { foreignKey: "address_id" });
    Address.hasOne(User, { foreignKey: "address_id" });
    User_has_meeting.belongsTo(Meeting, { foreignKey: "meeting_id" });
    Meeting.hasMany(User_has_meeting, { foreignKey: "meeting_id" });
    User_has_meeting.belongsTo(User, { foreignKey: "user_id" });
    User.hasMany(User_has_meeting, { foreignKey: "user_id" });
    User_has_swap.belongsTo(Book, { foreignKey: "book_id" });
    Book.hasMany(User_has_swap, { foreignKey: "book_id" });
    User_has_swap.belongsTo(Swap, { foreignKey: "swap_id" });
    Swap.hasMany(User_has_swap, { foreignKey: "swap_id" });
    User_has_swap.belongsTo(User, { foreignKey: "user_id" });
    User.hasMany(User_has_swap, { foreignKey: "user_id" });

    return {
        Address,
        Address_meeting,
        Book,
        Chapter,
        Meeting,
        Swap,
        User,
        User_has_meeting,
        User_has_swap,
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