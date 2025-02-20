import { BusinessController } from "../controllers/business.controller";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import RequestValidator from "../../../middlewares/schema.middleware";
import businessValidators from "../validators/business.validators";
import BaseRoute from "../../../utilities/base.router";
import PermissionValidation from "../../../middlewares/permission.middleware";
import { Permissions } from "../../../utilities/enums/permissions.enum";
import AccessControl from "../../../middlewares/access.control.middleware";
import { AdminType } from "../../../utilities/enums/enum";

export default class BusinessRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected setupRoutes(): void {
    const businessController = new BusinessController();

    const authenticationMiddleware = new AuthenticationMiddleware();

    this.router.post(
      "/create",
      RequestValidator.validateRequestSchema(businessValidators.createBusiness),
      authenticationMiddleware.AuthorizeUser,
      AccessControl.restrictTo([AdminType.REGULAR_ADMIN]),
      PermissionValidation.PermissionMiddleware([Permissions.CREATE_BUSINESS]),
      businessController.CreateBusiness
    );

    this.router.get(
      "/",
      authenticationMiddleware.AuthorizeUser,
      businessController.GetBusinesses
    );

    
    this.router.delete(
      "/:businessId", 
      authenticationMiddleware.AuthorizeUser,
      AccessControl.restrictTo([AdminType.SUPER_ADMIN]),
      PermissionValidation.PermissionMiddleware([
        Permissions.CREATE_BUSINESS,
        Permissions.DELETE_BUSINESS
      ]),
      businessController.DeleteBusiness
    );

    this.router.patch(
      "/addTapKey",
      RequestValidator.validateRequestSchema(businessValidators.addTapCredentials),
      authenticationMiddleware.AuthorizeUser,
      AccessControl.restrictTo([AdminType.BUSINESS_REGULAR_ADMIN,AdminType.BUSINESS_SUPER_ADMIN], false),
      PermissionValidation.PermissionMiddleware([
        Permissions.EDIT_BUSINESS,
        Permissions.CREATE_BUSINESS,
      ]),
      businessController.AddTapCredentials
    );

    this.router.patch(
      "/update/:businessId",
      RequestValidator.validateRequestSchema(businessValidators.updateBusiness),
      authenticationMiddleware.AuthorizeUser,
      AccessControl.restrictTo([AdminType.REGULAR_ADMIN]),
      PermissionValidation.PermissionMiddleware([
        Permissions.EDIT_BUSINESS,
        Permissions.CREATE_BUSINESS,
      ]),
      businessController.UpdateBusiness
    );

    this.router.post(
      "/createClient",
      RequestValidator.validateRequestSchema(businessValidators.createClient),
      authenticationMiddleware.AuthorizeUser,
      AccessControl.restrictTo([AdminType.BUSINESS_REGULAR_ADMIN, AdminType.BUSINESS_SUPER_ADMIN], false),
      PermissionValidation.PermissionMiddleware([Permissions.CREATE_CLIENT]),
      businessController.ClientAccountCreation
    );

  }
}
