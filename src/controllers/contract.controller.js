const { Contract } = require("../models/contract");
const { Trainee } = require("../models/trainee");
const { Category } = require("../models/category");
const { Company } = require("../models/company");

class ContractCrontoller {
  async createOneContract(request, response) {
    try {
      const {
        traineeId,
        categoryId,
        companyId,
        startValidity,
        endValidity,
        status,
        cep,
        remuneration,
        extra,
        createdAt,
        updatedAt,
      } = request.body;

      if (
        !traineeId ||
        !categoryId ||
        !companyId ||
        !startValidity ||
        !endValidity ||
        !status ||
        !cep ||
        !remuneration ||
        !extra
      ) {
        return response.status(400).send({
          message: "Todos os campos são obrigatórios!",
        });
      }

      const data = await Contract.create({
        traineeId,
        categoryId,
        companyId,
        startValidity,
        endValidity,
        status,
        cep,
        remuneration,
        extra,
        createdAt,
        updatedAt,
      });

      return response.status(201).send(data);
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Erro ao criar o contrato",
        error: error.message,
      });
    }
  }

  async getAllContracts(request, response) {
    const data = await Contract.findAll({
      order: [["id", "ASC"]],
      include: [
        { model: Trainee, attributes: ["name"] },
        { model: Category, attributes: ["name"] },
        { model: Company, attributes: ["companyName"] },
      ],
    });
    return response.status(200).send(data);
  }

  async getOneContract(request, response) {
    const { id } = request.params;
    const data = await Contract.findByPk(id);
    return response.status(200).send(data);
  }

  async updateOneContract(request, response) {
    try {
      const {
        traineeId,
        categoryId,
        companyId,
        startValidity,
        endValidity,
        status,
        remuneration,
        extra,
        createdAt,
        updatedAt,
      } = request.body;

      await Contract.update({
        traineeId,
        categoryId,
        companyId,
        startValidity,
        endValidity,
        status,
        remuneration,
        extra,
        createdAt,
        updatedAt,
      });

      return response.status(201).send(data);
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Erro ao atualizar o contrato",
        error: error.message,
      });
    }
  }

  async deleteOneContract(request, response) {
    try {
      const { id } = request.params;
      await Contract.destroy({
        where: {
          id,
        },
      });

      return response
        .status(204)
        .send({ message: "Contrato excluído com sucesso!" });
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Impossível excluir o contrato!",
        error: error.message,
      });
    }
  }
}

module.exports = new ContractCrontoller();
