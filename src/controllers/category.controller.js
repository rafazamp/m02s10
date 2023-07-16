const { Category } = require("../models/category");
const { config } = require("dotenv");
config();

class CategoryController {
  async createOneCategory(request, response) {
    const { name } = request.body;

    if (!name) {
      return response
        .status(400)
        .send({ message: "O campo name é obrigatório!" });
    }
    const data = await Category.create({ name });
    return response
      .status(201)
      .send({ data, message: "Categoria criada com sucesso!" });
  }

  async getAllCategories(request, response) {
    const data = await Category.findAll({
      order: [["id", "ASC"]],
    });
    return response.status(200).send(data);
  }

  async getOneCategory(request, response) {
    console.log("Pós middleware");
    const { id } = request.params;
    const data = await Category.findByPk(id);
    return response.status(200).send(data);
  } 
  

  async updateOneCategory(request, response) {
    const { id } = request.params;
    const { name } = request.body;
    await Category.update({ name }, { where: { id } });
    return response
      .status(204)
      .send({ message: "Categoria atualizada com sucesso!" });
  }

  async deleteOneCategory(request, response) {
    const { id } = request.params;
    await Category.destroy({ where: { id } });
    return response
      .status(204)
      .send({ message: "Categoria excluída com sucesso!" });
  }
}
module.exports = new CategoryController();
