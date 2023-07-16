const { Router } = require("express");
const { auth } = require("../middleware/auth");

const {
  createOneCompany,
  getAllCompanies,
  getOneCompany,
  updateOneCompany,
  deleteOneCompany,
} = require("../controllers/company.controller");

class CompanyRoutes {
  routesFromCompany() {
    const companyRoutes = Router();
    companyRoutes.post("/createOneCompany", auth, createOneCompany);
    companyRoutes.get("/getAllCompanies", auth, getAllCompanies);
    companyRoutes.get("/getOneCompany/:id", auth, getOneCompany);
    companyRoutes.patch("/updateOneCompany/:id", auth, updateOneCompany);
    companyRoutes.delete("/deleteOneCompany/:id", auth, deleteOneCompany);
    return companyRoutes;
  }
}
module.exports = new CompanyRoutes();
