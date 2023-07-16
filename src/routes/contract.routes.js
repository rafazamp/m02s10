const { Router } = require("express");
const { auth } = require("../middleware/auth");

const {
  createOneContract,
  getAllContracts,
  getOneContract,
  updateOneContract,
  deleteOneContract,
} = require("../controllers/contract.controller");

class ContractRoutes {
  routesFromContract() {
    const contractRoutes = Router();
    contractRoutes.post("/createOneContract", createOneContract);
    contractRoutes.get("/getAllContracts", getAllContracts);
    contractRoutes.get("/getOneContract/:id", getOneContract);
    contractRoutes.patch("/updateOneContract/:id", updateOneContract);
    contractRoutes.delete("/deleteOneContract/:id", deleteOneContract);
    return contractRoutes;
  }
}
module.exports = new ContractRoutes();
