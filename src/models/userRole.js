const { connection } = require("../database/connection");
const { DATE, INTEGER } = require("sequelize");
const { User } = require("./user");
const { Role } = require("./role");

const userRole = connection.define(
  "users_roles",
  {
    userId: {
      type: INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    roleId: {
      type: INTEGER,
      references: {
        model: Role,
        key: "id",
      },
    },
    createdAt: DATE,
    updatedAt: DATE,
  },
  { underscored: true, paranoid: true } //Serve para escrevermos no banco de dados em Snake Case,
  //podendo persistir o camelCase do JS
);

module.exports = { userRole };
