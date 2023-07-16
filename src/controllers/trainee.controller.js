const { Trainee } = require("../models/trainee");

class TraineeController {
  async createOneTrainee(request, response) {
    try {
      const {
        name,
        email,
        rg,
        cpf,
        primaryPhoneContact,
        secondaryPhoneContact,
        dateBirth,
        fatherName,
        motherName,
        haveSpecialNeeds,
      } = request.body;

      if (!name || !email || !rg || !cpf || !primaryPhoneContact || !dateBirth ||
      !fatherName || !motherName || !haveSpecialNeeds) {
        return response.status(400).send({
          message: "Todos os campos (exceto secondaryPhoneContact) são obrigatórios!",
        });
      }

      const data = await Trainee.create({
        name,
        email,
        rg,
        cpf,
        primaryPhoneContact,
        secondaryPhoneContact,
        dateBirth,
        fatherName,
        motherName,
        haveSpecialNeeds,
      });

      return response.status(201).send({data, message: "Trainee criado com sucesso!"});
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Erro ao criar o trainee",
        error: error.message,
      });
    }
  }

  async getAllTrainees(request, response) {
    const data = await Trainee.findAll({
      order: [["name", "ASC"]],
    });
    return response.status(200).send(data);
  }

  async getOneTrainee(request, response) {
    const { id } = request.params;
    const data = await Trainee.findByPk(id);
    return response.status(200).send(data);
  }

  async updateOneTrainee(request, response) {
    try {
      const { id } = request.params;
      const {
        name,
        email,
        rg,
        cpf,
        primaryPhoneContact,
        secondaryPhoneContact,
        dateBirth,
        fatherName,
        motherName,
        haveSpecialNeeds,
      } = request.body;

      await Trainee.update(
        {
          name,
          email,
          rg,
          cpf,
          primaryPhoneContact,
          secondaryPhoneContact,
          dateBirth,
          fatherName,
          motherName,
          haveSpecialNeeds,
        },
        {
          where: {
            id,
          },
        }
      );

      return response
        .status(204)
        .send({ message: "Trainee atualizado com sucesso!" });
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Impossível atualizar o trainee!",
        error: error.message,
      });
    }
  }

  async deleteOneTrainee(request, response) {
    try {
      const { id } = request.params;
      await Trainee.destroy({
        where: {
          id,
        },
      });

      return response
        .status(204)
        .send({ message: "Trainee excluído com sucesso!" });
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Impossível excluir o trainee!",
        error: error.message,
      });
    }
  }
}

module.exports = new TraineeController();
