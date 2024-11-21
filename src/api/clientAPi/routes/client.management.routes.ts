// import express, { Router } from "express";
import BaseRoute from "../../../utilities/base.router";
import clientValidator from "../validators/clientAuth.validators";
import RequestValidator from "../../../middlewares/schema.middleware";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import ClientAuthController from "../controllers/client.management.controller";
// import PermissionValidation from "../../../middlewares/permission.middleware";
// import { Permissions } from "../../../utilities/enums/permissions.enum";


export default class ClientAuthRoutes extends BaseRoute{
  constructor() {
   super();

  }

  protected setupRoutes(): void {
    const clientAuthController :  ClientAuthController = new ClientAuthController();
    const authenticationMiddleware :  AuthenticationMiddleware = new AuthenticationMiddleware();
    

    this.router.get(
      "/getClients",
      RequestValidator.validateRequestSchema(clientValidator.getClients, "query"),
      authenticationMiddleware.AuthorizeUser,
      clientAuthController.GetAllClients
    );
    // Add other routes here...
  }
}


