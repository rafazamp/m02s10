const { connection } = require("../database/connection");
const { STRING, DATE } = require("sequelize");

const Company = connection.define(
  "Company",
  {
    cnpj: {
      type: STRING,
      validate: {
        len: {
          args: [14, 14],
          msg: "Este campo deve ter 14 caracteres.",
        },
      },
      unique: {
        msg: "Já existe uma empresa cadastrada com este CNPJ.",
      },
    },
    companyName: STRING,
    contact: STRING,
    cep: STRING,
    address: STRING,
    neighborhood: STRING,
    city: STRING,
    state: STRING,
    number: STRING,
    complement: {
      type: STRING,
      allowNull: true,
    },
    rhAnalystName: STRING,
    supervisorName: STRING,
    createdAt: DATE,
    updatedAt: DATE,
  },
  { underscored: true, paranoid: true } //Serve para escrevermos no banco de dados em Snake Case,
  //podendo persistir o camelCase do JS
);

module.exports = { Company };
