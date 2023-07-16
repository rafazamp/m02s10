const { Permission } = require("../models/permission");
const { config } = require("dotenv");
config();

class PermissionController {
  async createOnePermission(request, response) {
    const { description } = request.body;

    if (!description) {
      return response
        .status(400)
        .send({ message: "O campo de descrição é obrigatório!" });
    }
    const data = await Permission.create({ description });
    return response
      .status(201)
      .send({ data, message: "Permissão criada com sucesso!" });
  }
}

module.exports = new PermissionController();
