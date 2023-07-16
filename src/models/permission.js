const { connection } = require("../database/connection");
const { STRING, DATE } = require("sequelize");
const { permissionRole } = require("./permissionRole");
const { Role } = require("./role");


const Permission = connection.define(
  "permission",
  {
    description: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [3, 255],
      },
      unique: { msg: "Permission already exists" },
    },
    createdAt: DATE,
    updatedAt: DATE,
  },
  { underscored: true, paranoid: true } //Serve para escrevermos no banco de dados em Snake Case,
  //podendo persistir o camelCase do JS
);

//Permission.belongsToMany(Role, { through: permissionRole });
//Role.belongsToMany(Permission, { through: permissionRole });

Permission.belongsToMany(Role, {
  through: permissionRole,
});

Role.belongsToMany(Permission, {
  through: permissionRole,
});

module.exports = {
  Permission,
};


