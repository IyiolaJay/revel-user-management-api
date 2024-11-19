// import express, { Router } from "express";
import AdminAuthController from "../controllers/auth.controller";
import BaseRoute from "../../../utilities/base.router";
import authValidator from "../validators/auth.validators";
import RequestValidator from "../../../middlewares/schema.middleware";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
// import PermissionValidation from "../../../middlewares/permission.middleware";
// import { Permissions } from "../../../utilities/enums/permissions.enum";

export default class AdminAuthRoutes extends BaseRoute{
  constructor() {
   super();

  }

  protected setupRoutes(): void {
    const adminAuthController :  AdminAuthController = new AdminAuthController();
    const authenticationMiddleware :  AuthenticationMiddleware = new AuthenticationMiddleware();
    
    // this.router.post(
    //   "/createAdmin",
    //   RequestValidator.validateRequestSchema(authValidator.createAdmin),
    //   adminAuthController.AdminAccountCreationController
    // );

    this.router.post(
      "/login",
      RequestValidator.validateRequestSchema(authValidator.loginAccount),
      RequestValidator.validateRequestSchema(authValidator.loginAccountType, "query"),
      adminAuthController.AccountLoginController
    );

    this.router.post(
      "/verifyToken",
      authenticationMiddleware.AuthorizeUser,
      RequestValidator.validateRequestSchema(authValidator.verifyToken),
      adminAuthController.VerifyTokenController
    );

    this.router.patch(
      "/changePassword",
      RequestValidator.validateRequestSchema(authValidator.changePassword),
      RequestValidator.validateRequestSchema(authValidator.changePasswordQuery, "query"),
      adminAuthController.ChangePasswordController
    );


    // this.router.post(
    //   "/createClientAccount",
    //   RequestValidator.validateRequestSchema(authValidator.createClient),
    //   authenticationMiddleware.AuthorizeUser,
    //   PermissionValidation.PermissionMiddleware([Permissions.CREATE_CLIENT]),
    //   adminAuthController.ClientAccountCreationController
    // );
 
    // this.router.get(
    //   "/permissions",
    //   // authenticationMiddleware.AuthorizeUser,
    //   adminAuthController.GetPermissionsController
    // );


    // Add other routes here...
  }
}


