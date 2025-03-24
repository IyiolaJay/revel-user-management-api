import { Request, Response, NextFunction } from "express";
import BaseController from "../../../utilities/base.controller";
import AdminRepository from "../../../repositories/admin.repository";
import httpStatus from "http-status";
import ClientRepository from "../../../repositories/client.repository";
import UserAuthService from "../services/auth.service";
import BusinessAdminRepository from "../../../repositories/businessAdmins.repository";

export default class UserAuthController extends BaseController {
  private UserAuthService: UserAuthService;

  constructor() {
    super();

    this.UserAuthService = new UserAuthService(
      new AdminRepository(),
      new ClientRepository(),
      new BusinessAdminRepository()
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
      const { loginType } = req.body;
      let token;

      const device = (req as any).deviceInfo;
      token = await this.UserAuthService.LoginAccount(req.body, device, loginType)

      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: token.message ?? "Login success",
        data: {
          accessToken: token.accessToken,
          rememberDevice: token.rememberDevice ?? false,
          accountType : token.accountType
        },
      });
    }
  );

  VerifyTokenController = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { token } = req.body;
      const { user } = res.locals;
      const { rememberDevice } = req.query;
     const device = (req as any).deviceInfo;

      const apiToken = await this.UserAuthService.VerifyToken(
        token,
        user,
        Boolean(rememberDevice),
        device
      );
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Token verified",
        data: apiToken,
      });
    }
  );

  ChangePasswordController = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const userId = req.query.clientId ?? req.query.adminId;
      const path = req.query.clientId ? "client" : "admin";

      const { password } = req.body;
      await this.UserAuthService.ChangePassword(
        userId as string,
        password,
        path
      );
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
