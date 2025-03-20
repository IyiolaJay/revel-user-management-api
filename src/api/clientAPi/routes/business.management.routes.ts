import  BusinessManagementController  from "../controllers/business.management.controller";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import RequestValidator from "../../../middlewares/schema.middleware";
import businessManagementValidators from "../validators/business.management.validators";
import BaseRoute from "../../../utilities/base.router";
import PermissionValidation from "../../../middlewares/permission.middleware";
import { Permissions } from "../../../utilities/enums/permissions.enum";
import AccessControl from "../../../middlewares/access.control.middleware";
import { AdminType } from "../../../utilities/enums/enum";

export default class BusinessManagementRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected setupRoutes(): void {
    const businessManagementController = new BusinessManagementController();

    const authenticationMiddleware = new AuthenticationMiddleware();

    
    this.router.post(
        "/admin",
        RequestValidator.validateRequestSchema(businessManagementValidators.createBusinessAdmin),
        authenticationMiddleware.AuthorizeUser,
        AccessControl.restrictTo([AdminType.BUSINESS_SUPER_ADMIN], false),
        businessManagementController.CreateBusinessAdmin
    )

    this.router.put(
      "/addTapKey",
      RequestValidator.validateRequestSchema(businessManagementValidators.addTapCredentials),
      authenticationMiddleware.AuthorizeUser,
      AccessControl.restrictTo([AdminType.BUSINESS_REGULAR_ADMIN,AdminType.BUSINESS_SUPER_ADMIN], false),
      PermissionValidation.PermissionMiddleware([
        Permissions.EDIT_BUSINESS,
        Permissions.CREATE_BUSINESS,
      ]),
      businessManagementController.AddTapCredentials
    );
  }
}
