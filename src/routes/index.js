const { Router } = require("express");
const routes = Router();

const { routesFromCategory } = require("./category.routes");
const { routesFromTrainee } = require("./trainee.routes");
const { routesFromCompany } = require("./company.routes");
const { routesFromContract } = require("./contract.routes");
const { routesFromUser } = require("./user.routes");
const { routesFromRbac } = require("./rbac.routes");


routes.use("/api", [
  routesFromCategory(),
  routesFromTrainee(),
  routesFromCompany(),
  routesFromContract(),
  routesFromUser(),
  routesFromRbac(),
]);

module.exports = routes;
