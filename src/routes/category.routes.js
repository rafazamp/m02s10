const { Router } = require("express");
const { auth } = require("../middleware/auth");

const {
  createOneCategory,
  getAllCategories,
  getOneCategory,
  updateOneCategory,
  deleteOneCategory,
} = require("../controllers/category.controller");

class CategoryRoutes {
  routesFromCategory() {
    const categoryRoutes = Router();
    categoryRoutes.post("/createOneCategory", auth, createOneCategory);
    categoryRoutes.get("/getAllCategories", auth, getAllCategories);
    categoryRoutes.get("/getOneCategory/:id", auth, getOneCategory);
    categoryRoutes.patch("/updateOneCategory/:id", auth, updateOneCategory);
    categoryRoutes.delete("/deleteOneCategory/:id", auth, deleteOneCategory);
    return categoryRoutes;
  }
}
module.exports = new CategoryRoutes();
