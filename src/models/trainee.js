const { connection } = require("../database/connection");
const { STRING, DATE, BOOLEAN } = require("sequelize");

const Trainee = connection.define(
  "Trainee",
  {
    name: STRING,
    email: {
      type: STRING,
      validate: {
        isEmail: {
          msg: "Este campo deve ser um email válido.",
        },
      },
    },
    rg: {
      type: STRING,
      validate: {
        len: {
          args: [7, 20],
          msg: "Este campo deve ter no mínimo 7 caracteres.",
        },
      },
      unique: {
        msg: "Já existe um trainee cadastrado com esse RG.",
      },
    },

    cpf: {
      type: STRING,
      validate: {
        len: {
          args: [11, 11],
          msg: "Este campo deve ter no máximo 11 caracteres.",
        },
      },
      unique: {
        msg: "Já existe um trainee cadastrado com esse CPF",
      },
    },

    primaryPhoneContact: STRING,
    secondaryPhoneContact: {
      type: STRING,
      allowNull: true,
    },
    dateBirth: DATE,
    fatherName: STRING,
    motherName: STRING,
    haveSpecialNeeds: BOOLEAN,
    createdAt: DATE,
    updatedAt: DATE,
  },

  { underscored: true, paranoid: true } //Serve para escrevermos no banco de dados em Snake Case,
  //podendo persistir o camelCase do JS
);

module.exports = { Trainee };
