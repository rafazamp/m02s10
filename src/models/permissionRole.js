const { connection } = require("../database/connection");
const { DATE, INTEGER } = require("sequelize");
const { Permission } = require("./permission");
const { Role } = require("./role");

const permissionRole = connection.define(
  "permissions_roles",
  {
    permissionId: {
      type: INTEGER,
      references: {
        model: Permission,
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

module.exports = { permissionRole };
