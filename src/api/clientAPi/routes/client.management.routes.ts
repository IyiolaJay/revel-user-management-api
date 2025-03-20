import BaseRoute from "../../../utilities/base.router";
import RequestValidator from "../../../middlewares/schema.middleware";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import ClientAuthController from "../controllers/client.management.controller";
// import filterValidators from "../validators";
import clientManagementValidators from "../validators/client.management.validators";
import PermissionValidation from "../../../middlewares/permission.middleware";
import { Permissions } from "../../../utilities/enums/permissions.enum";
import AccessControl from "../../../middlewares/access.control.middleware";
import { AdminType } from "../../../utilities/enums/enum";


export default class ClientAuthRoutes extends BaseRoute{
  constructor() {
   super();

  }

  protected setupRoutes(): void {
    const clientAuthController :  ClientAuthController = new ClientAuthController();
    const authenticationMiddleware :  AuthenticationMiddleware = new AuthenticationMiddleware();
    

    this.router.post(
      "/clients",
      RequestValidator.validateRequestSchema(clientManagementValidators.createClient),
      authenticationMiddleware.AuthorizeUser,
      AccessControl.restrictTo([AdminType.BUSINESS_REGULAR_ADMIN, AdminType.BUSINESS_SUPER_ADMIN], false),
      PermissionValidation.PermissionMiddleware([Permissions.CREATE_CLIENT]),
      clientAuthController.ClientAccountCreation
    );

    this.router.get(
      "/clients",
      // RequestValidator.validateRequestSchema(filterValidators.paginationParams, "query"),
      authenticationMiddleware.AuthorizeUser,
      AccessControl.restrictTo([AdminType.BUSINESS_SUPER_ADMIN,AdminType.BUSINESS_REGULAR_ADMIN]),
      PermissionValidation.PermissionMiddleware([Permissions.VIEW_CLIENT]),
      clientAuthController.GetAllClients
    );

    this.router.patch(
      "/clients/edit/:clientId",
      RequestValidator.validateRequestSchema(clientManagementValidators.updateClient),
      authenticationMiddleware.AuthorizeUser,
      PermissionValidation.PermissionMiddleware([Permissions.EDIT_CLIENT]),
      clientAuthController.UpdateClient
    );

    this.router.patch(
      "/clients/updatePassword",
      RequestValidator.validateRequestSchema(clientManagementValidators.updatePassword),
      authenticationMiddleware.AuthorizeUser,
      clientAuthController.UpdateClientPassword
    );

    this.router.get(
      "/clients/search",
      RequestValidator.validateRequestSchema(clientManagementValidators.searchClient, "query"),
      clientAuthController.SearchClient
    );
  }
}


