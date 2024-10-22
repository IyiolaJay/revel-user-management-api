// import express, { Router } from "express";
import BaseRoute from "../../../utilities/base.router";
import clientValidator from "../validators/clientAuth.validators";
import RequestValidator from "../../../middlewares/schema.middleware";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import ClientAuthController from "../controllers/clientAuth.controller";
import PermissionValidation from "../../../middlewares/permission.middleware";
import { Permissions } from "../../../utilities/enums/permissions.enum";

export default class ClientAuthRoutes extends BaseRoute{
  constructor() {
   super();

  }

  protected setupRoutes(): void {
    const clientAuthController :  ClientAuthController = new ClientAuthController();
    const authenticationMiddleware :  AuthenticationMiddleware = new AuthenticationMiddleware();
    
    this.router.post(
      "/createAccount",
      RequestValidator.validateRequestSchema(clientValidator.createClient),
      authenticationMiddleware.AuthorizeUser,
      PermissionValidation.PermissionMiddleware([Permissions.CREATE_CLIENT]),
      clientAuthController.ClientAccountCreationController
    );

    this.router.post(
      "/login",
      RequestValidator.validateRequestSchema(clientValidator.accountLogin),
      clientAuthController.ClientAccountLoginController
    );

    this.router.post(
      "/verifyToken",
      authenticationMiddleware.AuthorizeUser,
      RequestValidator.validateRequestSchema(clientValidator.verifyToken),
      clientAuthController.VerifyTokenController
    )

    // Add other routes here...
  }
}


