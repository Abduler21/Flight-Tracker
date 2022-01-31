const Sequelize = require("sequelize");
const db = require("../config/config");

const User = db.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  FirstName: {
    type: Sequelize.STRING,
  },
  LastName: {
    type: Sequelize.STRING,
  },
  Email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  Password: {
    type: Sequelize.STRING,
    validate: {
      min: 6,
    },
  },
  Gender: {
    type: Sequelize.STRING,
  },

  DateOfBirth: {
    type: Sequelize.DATE,
  },
});

User.sync().then(() => {
  console.log("table created");
});
module.exports = User;
