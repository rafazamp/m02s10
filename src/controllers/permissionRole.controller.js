const { permissionRole } = require("../models/permissionRole");
const { Permission } = require("../models/permission");
const { Role } = require("../models/role");

class PermissionRoleController {
  async createOnePermissionRole(request, response) {
    try {
      const { permissionId, roleId } = request.body;

      if (!permissionId || !roleId) {
        return response.status(400).send({
          message: "Todos os campos são obrigatórios!",
        });
      }

      const data = await permissionRole.create({
        permissionId,
        roleId,
      });

      return response
        .status(201)
        .send({ data, message: "PermissionRole criado com sucesso!" });
    } catch (error) {
      return response.status(400).send({
        message: "Erro ao criar o PermissionRole",
        error: error.message,
      });
    }
  }
}

module.exports = new PermissionRoleController();
