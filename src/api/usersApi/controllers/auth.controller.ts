import { Request, Response, NextFunction } from "express";
import BaseController from "../../../utilities/base.controller";
import { IAdmin } from "../../../interfaces/admin.interface";
import AdminRepository from "../../../repositories/admin.repository";
import httpStatus from "http-status";
import ClientRepository from "../../../repositories/client.repository";
import { IClient } from "../../../interfaces/client.interface";
import UserAuthService from "../services/auth.service";

export default class UserAuthController extends BaseController {
  private UserAuthService: UserAuthService;

  constructor() {
    super();

    this.UserAuthService = new UserAuthService(
      new AdminRepository(),
      new ClientRepository()
    );
  }

  // AdminAccountCreationController = this.wrapAsync(
  //   async (req: Request, res: Response, _: NextFunction) => {
  //     await this.UserAuthService.CreateAdminAccount(req.body as IAdmin);
  //     this.sendResponse(res, httpStatus.CREATED, {
  //       success: true,
  //       message: "Admin created",
  //       data: null,
  //     });
  //   }
  // );

  AccountLoginController = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const {loginType} = req.body;
      let token;

      if(loginType === "admin"){
        token = await this.UserAuthService.LoginAdminAccount(
          req.body as IAdmin
        );
      }else {
        token = await this.UserAuthService.LoginClientAccount(
          req.body as IClient
        )
      }

      
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Login success",
        data: token,
      });
    }
  );

  VerifyTokenController = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { token } = req.body;
      const { user } = res.locals;
      const apiToken = await this.UserAuthService.VerifyToken(token, user);
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Token verified",
        data: apiToken,
      });
    }
  );

  ChangePasswordController = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { userId } = req.query;
      const { password } = req.body;
      await this.UserAuthService.ChangePassword(userId as string, password);
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Password changed, please login again",
        data: null,
      });
    }
  );

  // ClientAccountCreationController = this.wrapAsync(
  //   async (req: Request, res: Response, _: NextFunction) => {
  //     await this.UserAuthService.CreateClientAccount(req.body as IClient);
  //     this.sendResponse(res, httpStatus.CREATED, {
  //       success: true,
  //       message:
  //         "Client account created & credentials email sent to provided email",
  //       data: null,
  //     });
  //   }
  // );

  // GetPermissionsController = this.wrapAsync(
  //   async (__: Request, res: Response, _: NextFunction) => {
  //       const permissions = Object.values(Permissions)
  //       this.sendResponse(res, httpStatus.OK, {
  //       success: true,
  //       message:
  //         "",
  //       data: permissions,
  //     });
  //   }
  // );
}