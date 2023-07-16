const { Company } = require("../models/company");

class CompanyController {
  async createOneCompany(request, response) {
    try {
      const {
        cnpj,
        companyName,
        contact,
        cep,
        address,
        neighborhood,
        city,
        state,
        number,
        complement,
        rhAnalystName,
        supervisorName,
        createdAt,
        updatedAt,
      } = request.body;

      if (!cnpj || !companyName || !contact
        || !cep || !address || !neighborhood
        || !city || !state || !number
        || !complement
        || !rhAnalystName || !supervisorName) {

        return response.status(400).send({
          message: "Todos os campos são obrigatórios!",
        });
      }
      
      const data = await Company.create({
        cnpj,
        companyName,
        contact,
        cep,
        address,
        neighborhood,
        city,
        state,
        number,
        complement,
        rhAnalystName,
        supervisorName,
        createdAt,
        updatedAt,
      });

      return response.status(201).send(data);
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Erro ao criar a empresa",
        error: error.message,
      });
    }
  }

  async getAllCompanies(request, response) {
    const data = await Company.findAll({
      order: [["id", "ASC"]],
      attributes: ["companyName", "cnpj"]
    });
    return response.status(200).send(data);
  }

  async getOneCompany(request, response) {
    const { id } = request.params;
    const data = await Company.findByPk(id);
    return response.status(200).send(data);
  }

  async updateOneCompany(request, response) {
    try {
      const { id } = request.params;
      const {
        cnpj,
        companyName,
        contact,
        cep,
        address,
        neighborhood,
        city,
        state,
        number,
        complement,
        rhAnalystName,
        supervisorName,
        createdAt,
        updatedAt,
      } = request.body;

      await Company.update(
        {
          cnpj,
          companyName,
          contact,
          cep,
          address,
          neighborhood,
          city,
          state,
          number,
          complement,
          rhAnalystName,
          supervisorName,
          createdAt,
          updatedAt,
        },
        {
          where: {
            id,
          },
        }
      );

      return response
        .status(204)
        .send({ message: "Empresa atualizado com sucesso!" });
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Impossível atualizar a empresa!",
        error: error.message,
      });
    }
  }

  async deleteOneCompany(request, response) {
    const { id } = request.params;
    await Company.destroy({ where: { id } });
    return response
      .status(204)
      .send({ message: "Empresa excluída com sucesso!" });
  }
}

module.exports = new CompanyController();
