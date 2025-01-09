// import express, { Router } from "express";
import BaseRoute from "../../../utilities/base.router";
import RequestValidator from "../../../middlewares/schema.middleware";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import ClientAuthController from "../controllers/client.management.controller";
import filterValidators from "../validators";
import clientManagementValidators from "../validators/client.management.validators";
import PermissionValidation from "../../../middlewares/permission.middleware";
import { Permissions } from "../../../utilities/enums/permissions.enum";


export default class ClientAuthRoutes extends BaseRoute{
  constructor() {
   super();

  }

  protected setupRoutes(): void {
    const clientAuthController :  ClientAuthController = new ClientAuthController();
    const authenticationMiddleware :  AuthenticationMiddleware = new AuthenticationMiddleware();
    

    this.router.get(
      "/getClients",
      RequestValidator.validateRequestSchema(filterValidators.paginationParams, "query"),
      authenticationMiddleware.AuthorizeUser,
      PermissionValidation.PermissionMiddleware([Permissions.VIEW_CLIENT]),
      clientAuthController.GetAllClients
    );
    // Add other routes here...

    this.router.patch(
      "/edit/:clientId",
      RequestValidator.validateRequestSchema(clientManagementValidators.updateClient),
      authenticationMiddleware.AuthorizeUser,
      PermissionValidation.PermissionMiddleware([Permissions.EDIT_CLIENT]),
      clientAuthController.UpdateClient
    );

    this.router.patch(
      "/upgrade/:clientId",
      authenticationMiddleware.AuthorizeUser,
      PermissionValidation.PermissionMiddleware([Permissions.EDIT_CLIENT]),
      clientAuthController.UpgradeCustomerAccount
    );
  }
}


