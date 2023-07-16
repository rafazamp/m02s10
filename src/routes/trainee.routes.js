const { Router } = require("express");
const { auth } = require("../middleware/auth");

const {
  createOneTrainee,
  getAllTrainees,
  getOneTrainee,
  updateOneTrainee,
  deleteOneTrainee,
} = require("../controllers/trainee.controller");

class TraineeRoutes {
  routesFromTrainee() {
    const traineeRoutes = Router();
    traineeRoutes.post("/createOneTrainee", createOneTrainee);
    traineeRoutes.get("/getAllTrainees", auth, getAllTrainees);
    traineeRoutes.get("/getOneTrainee/:id", auth, getOneTrainee);
    traineeRoutes.patch("/updateOneTrainee/:id", auth, updateOneTrainee);
    traineeRoutes.delete("/deleteOneTrainee/:id", auth, deleteOneTrainee);
    return traineeRoutes;
  }
}

module.exports = new TraineeRoutes();
