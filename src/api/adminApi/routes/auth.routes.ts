// import express, { Router } from "express";
import AdminAuthController from "../controllers/auth.controller";
import BaseRoute from "../../../utilities/base.router";
import adminValidator from "../validators/auth.validators";
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
      adminAuthController.AdminAccountCreationController
    );

    // this.router.post(
    //   "/login",
    //   RequestValidator.validateRequestSchema(adminValidator.loginAdmin),
    //   adminAuthController.AdminAccountLoginController
    // );

    // this.router.post(
    //   "/verifyToken",
    //   authenticationMiddleware.AuthorizeUser,
    //   RequestValidator.validateRequestSchema(adminValidator.verifyToken),
    //   adminAuthController.VerifyTokenController
    // );

    // this.router.patch(
    //   "/changePassword",
    //   RequestValidator.validateRequestSchema(adminValidator.changePassword),
    //   RequestValidator.validateRequestSchema(adminValidator.changePasswordQuery, "query"),
    //   adminAuthController.ChangePasswordController
    // );


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


    // Add other routes here...
  }
}


