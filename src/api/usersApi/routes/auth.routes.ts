import AdminAuthController from "../controllers/auth.controller";
import BaseRoute from "../../../utilities/base.router";
import authValidator from "../validators/auth.validators";
import RequestValidator from "../../../middlewares/schema.middleware";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";


export default class AdminAuthRoutes extends BaseRoute{
  constructor() {
   super();

  }

  protected setupRoutes(): void {
    const adminAuthController :  AdminAuthController = new AdminAuthController();
    const authenticationMiddleware :  AuthenticationMiddleware = new AuthenticationMiddleware();
    

    this.router.post(
      "/login",
      RequestValidator.validateRequestSchema(authValidator.loginAccount),
      authenticationMiddleware.GetAccountType,
      authenticationMiddleware.GetDeviceInfo,
      adminAuthController.AccountLoginController
    );

    this.router.post(
      "/verifyToken",
      RequestValidator.validateRequestSchema(authValidator.verifyToken),
      authenticationMiddleware.AuthorizeUser,
      authenticationMiddleware.GetDeviceInfo,
      adminAuthController.VerifyTokenController
    );

    this.router.patch(
      "/changePassword",
      RequestValidator.validateRequestSchema(authValidator.changePassword),
      RequestValidator.validateRequestSchema(authValidator.changePasswordQuery, "query"),
      authenticationMiddleware.AuthorizeUser,
      adminAuthController.ChangePasswordController
    );

    // Add other routes here...
  }
}


