// import express, { Router } from "express";
import AdminAuthController from "../controllers/auth.controller";
import BaseRoute from "../../../utilities/base.router";
import adminValidator from "../validators/auth.validators";
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
      "/createAdmin",
      RequestValidator.validateRequestSchema(adminValidator.createAdmin),
      adminAuthController.AdminAccountCreationController
    );

    this.router.post(
      "/login",
      RequestValidator.validateRequestSchema(adminValidator.loginAdmin),
      adminAuthController.AdminAccountLoginController
    );

    this.router.post(
      "/verifyToken",
      authenticationMiddleware.AuthorizeUser,
      RequestValidator.validateRequestSchema(adminValidator.verifyToken),
      adminAuthController.VerifyTokenController
    )

    // Add other routes here...
  }
}


