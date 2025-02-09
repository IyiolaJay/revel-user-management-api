// import express, { Router } from "express";
import AdminAuthController from "../controllers/admin.controller";
import BaseRoute from "../../../utilities/base.router";
import adminValidator from "../validators/admin.validators";
import RequestValidator from "../../../middlewares/schema.middleware";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import PermissionValidation from "../../../middlewares/permission.middleware";
import { Permissions } from "../../../utilities/enums/permissions.enum";

export default class AdminAuthRoutes extends BaseRoute{
  constructor() {
   super();

  }

  protected setupRoutes(): void {
    const adminAuthController :  AdminAuthController = new AdminAuthController();
    const authenticationMiddleware :  AuthenticationMiddleware = new AuthenticationMiddleware();
    
    this.router.post(
      "/createAdmin",
      RequestValidator.validateRequestSchema(adminValidator.createAdmin),
      authenticationMiddleware.AuthorizeUser,
      PermissionValidation.PermissionMiddleware([Permissions.CREATE_ADMIN]),
      adminAuthController.AdminAccountCreationController,
    );

    this.router.post(
      "/createClientAccount",
      RequestValidator.validateRequestSchema(adminValidator.createClient),
      authenticationMiddleware.AuthorizeUser,
      PermissionValidation.PermissionMiddleware([Permissions.CREATE_CLIENT]),
      adminAuthController.ClientAccountCreationController
    );
 
    this.router.get(
      "/permissions",
      // authenticationMiddleware.AuthorizeUser,
      adminAuthController.GetPermissionsController
    );

    this.router.patch(
      "/edit/:adminId",
      RequestValidator.validateRequestSchema(adminValidator.updateAdmin),
      authenticationMiddleware.AuthorizeUser,
      PermissionValidation.PermissionMiddleware([Permissions.EDIT_ADMIN]),
      adminAuthController.UpdateAdminAccount
    );

    this.router.get(
      "/all",
      authenticationMiddleware.AuthorizeUser,
      PermissionValidation.PermissionMiddleware([Permissions.VIEW_ADMIN]),
      adminAuthController.GetAdmins
    );
    // Add other routes here...
  }
}


