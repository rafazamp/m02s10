const { Router } = require("express");

const {
  createOneRole,
  createOnePermission,
  createOnePermissionRole,
  createOneUserRole,
} = require("../controllers/rbac.controller");

class RbacRoutes {
  routesFromRbac() {
    const rbacRoutes = Router();
    rbacRoutes.post("/createOneRole", createOneRole);
    rbacRoutes.post("/createOnePermission", createOnePermission);
    rbacRoutes.post("/createOnePermissionRole", createOnePermissionRole);
    rbacRoutes.post("/createOneUserRole", createOneUserRole);
    return rbacRoutes;
  }
}

module.exports = new RbacRoutes();
