const { userRole } = require("../models/userRole");
const { User } = require("../models/user");
const { Role } = require("../models/role");

class UserRoleController { 
  async createOneUserRole(request, response) {
    try {
      const { userId, roleId } = request.body;

      if (!userId || !roleId) {
        return response.status(400).send({
          message: "Todos os campos são obrigatórios!",
        });
      }

      const data = await userRole.create({
        userId,
        roleId,
      });

      return response
        .status(201)
        .send({ data, message: "UserRole criado com sucesso!" });
    } catch (error) {
      return response.status(400).send({
        message: "Erro ao criar o UserRole",
        error: error.message,
      });
    }
  }
}

module.exports = new UserRoleController();

