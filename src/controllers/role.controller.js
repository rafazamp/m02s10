const { Role } = require("../models/role");
const { config } = require("dotenv");
config();

class RoleController {
  async createOneRole(request, response) {
    const { description } = request.body;

    if (!description) {
      return response
        .status(400)
        .send({ message: "O campo de descrição é obrigatório!" });
    }
    const data = await Role.create({ description });
    return response
      .status(201)
      .send({ data, message: "Role criada com sucesso!" });
  }
}

module.exports = new RoleController();