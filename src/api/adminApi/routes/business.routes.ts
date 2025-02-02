import { BusinessController } from "../controllers/business.controller";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import RequestValidator from "../../../middlewares/schema.middleware";
import businessValidators from "../validators/business.validators";
import BaseRoute from "../../../utilities/base.router";
import PermissionValidation from "../../../middlewares/permission.middleware";
import { Permissions } from "../../../utilities/enums/permissions.enum";

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
      PermissionValidation.PermissionMiddleware([Permissions.CREATE_BUSINESS]),
      businessController.CreateBusiness
    );

    this.router.get(
      "/",
      authenticationMiddleware.AuthorizeUser,
      businessController.GetBusinesses
    );

    this.router.patch(
      "/:businessId",
      RequestValidator.validateRequestSchema(businessValidators.updateBusiness),
      authenticationMiddleware.AuthorizeUser,
      PermissionValidation.PermissionMiddleware([
        Permissions.EDIT_BUSINESS,
        Permissions.CREATE_BUSINESS,
      ]),
      businessController.UpdateBusiness
    );

    this.router.delete(
      "/:businessId", 
      authenticationMiddleware.AuthorizeUser,
      PermissionValidation.PermissionMiddleware([
        Permissions.CREATE_BUSINESS,
        Permissions.DELETE_BUSINESS
      ]),
      businessController.DeleteBusiness
    );
  }
}
