const { Role } = require("../models/role");
const { Permission } = require("../models/permission");
const { User } = require("../models/user");

class RBAC {
  async createOneRole(request, response) {
    try {
      const { description } = request.body;

      if (!description) {
        return response
          .status(400)
          .send({ message: "O campo de descrição é obrigatório!" });
      }

      const role = await Role.findOne({ where: { description } });
      if (role) {
        return response.status(400).send({ message: "Role já existe!" });
      }

      const data = await Role.create({ description });

      return response
        .status(201)
        .send({ data, message: "Role criada com sucesso!" });
    } catch (error) {
      return response.status(500).send({
        message: "Não foi possível criar a Role",
        error: error.message,
      });
    }
  }

  async createOnePermission(request, response) {
    try {
      const { description } = request.body;

      if (!description) {
        return response
          .status(400)
          .send({ message: "O campo de descrição é obrigatório!" });
      }

      const permission = await Permission.findOne({ where: { description } });
      if (permission) {
        return response.status(400).send({ message: "Permission já existe!" });
      }

      const data = await Permission.create({ description });

      return response
        .status(201)
        .send({ data, message: "Permission criada com sucesso!" });
    } catch (error) {
      return response.status(500).send({
        message: "Não foi possível criar a Permission",
        error: error.message,
      });
    }
  }

  async createOnePermissionRole(request, response) {
    try {
      const { permissionId, roleId } = request.body;

      if (!permissionId || !roleId) {
        return response.status(400).send({
          message: "Todos os campos são obrigatórios!",
        });
      }

      const role = await Role.findOne({ where: { id: roleId } });
      if (!role) {
        return response.status(400).send({ message: "Role não existe!" });
      }

      const permission = await Permission.findOne({
        where: { id: permissionId },
      });
      if (!permission) {
        return response.status(400).send({ message: "Permission não existe!" });
      }

      await role.addPermissions(permission);

      return response
        .status(201)
        .send({ role, message: "PermissionRole criado com sucesso!" });
    } catch (error) {
      return response.status(400).send({
        message: "Erro ao criar o PermissionRole",
        error: error.message,
      });
    }
  }

  async createOneUserRole(request, response) {
    try {
      const { userId, roleId } = request.body;

      if (!userId || !roleId) {
        return response.status(400).send({
          message: "Todos os campos são obrigatórios!",
        });
      }

      const role = await Role.findOne({ where: { id: roleId } });
      if (!role) {
        return response.status(400).send({ message: "Role não existe!" });
      }

      const user = await User.findOne({
        where: { id: userId },
      });
      if (!user) {
        return response.status(400).send({ message: "User não existe!" });
      }

      await user.addRoles(role);

      return response
        .status(201)
        .send({ user, message: "UserRole criado com sucesso!" });
    } catch (error) {
      return response.status(400).send({
        message: "Erro ao criar o UserRole",
        error: error.message,
      });
    }
  }
}

module.exports = new RBAC();
