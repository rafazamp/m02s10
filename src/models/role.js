const { connection } = require("../database/connection");
const { STRING, DATE } = require("sequelize");
const { User } = require("./user");
const { userRole } = require("./userRole");

const Role = connection.define(
  "role",
  {
    description: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [3, 255],
      },
      unique: { msg: "Role already exists" },
    },
    createdAt: DATE,
    updatedAt: DATE,
  },
  { underscored: true, paranoid: true } //Serve para escrevermos no banco de dados em Snake Case,
  //podendo persistir o camelCase do JS
);

User.belongsToMany(Role, { through: userRole });
Role.belongsToMany(User, { through: userRole });

module.exports = {
  Role,
};
