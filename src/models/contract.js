const { connection } = require("../database/connection");
const { STRING, DATE, INTEGER, DATEONLY, FLOAT, BOOLEAN} = require("sequelize");
const { Trainee } = require("./trainee");
const { Category } = require("./category");
const { Company } = require("./company");

const Contract = connection.define(
  "Contract",
  {
    traineeId: {
      type: INTEGER,
      references: {
        model: Trainee,
        key: "id",
      },
    },
    categoryId: {
      type: INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
    companyId: {
      type: INTEGER,
      references: {
        model: Company,
        key: "id",
      },
    },
    startValidity: DATEONLY,
    endValidity: STRING,
    status: BOOLEAN,
    remuneration: FLOAT,
    extra: FLOAT,
    createdAt: DATE,
    updatedAt: DATE,
  },
  { underscored: true, paranoid: true } //Serve para escrevermos no banco de dados em Snake Case,
  //podendo persistir o camelCase do JS
);

Contract.belongsTo(Trainee);
Contract.belongsTo(Category);
Contract.belongsTo(Company);

module.exports = { Contract };