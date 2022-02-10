const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./Users");

class Flights extends Model {}
Flights.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    totalAmount: {
      type: DataTypes.DECIMAL,
    },

    passenger_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cabin_class: {
      type: DataTypes.STRING,
    },
    originName: { type: DataTypes.STRING },

    timeZone: { type: DataTypes.STRING },

    operating_carrier: { type: DataTypes.STRING },

    destinationName: { type: DataTypes.STRING },

    departing_at: { type: DataTypes.DATE },

    arriving_at: { type: DataTypes.DATE },

    duration: { type: DataTypes.STRING },

    origin_city: { type: DataTypes.STRING },

    destination_city: { type: DataTypes.STRING },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "flights",
  }
);

module.exports = Flights;
