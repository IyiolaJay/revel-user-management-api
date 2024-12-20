import { Request, Response, NextFunction } from "express";
import BaseController from "../../../utilities/base.controller";
import AdminService from "../services/auth.service";
import { IAdmin } from "../../../interfaces/admin.interface";
import AdminRepository from "../../../repositories/admin.repository";
import httpStatus from "http-status";
import ClientRepository from "../../../repositories/client.repository";
import { IClient } from "../../../interfaces/client.interface";
import { Permissions } from "../../../utilities/enums/permissions.enum";
import ServiceRepository from "../../../repositories/service.repository";
export default class AdminAuthController extends BaseController {
  private AdminService: AdminService;

  constructor() {
    super();

    this.AdminService = new AdminService(
      new AdminRepository(),
      new ClientRepository(),
      new ServiceRepository()
    );
  }

  AdminAccountCreationController = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      await this.AdminService.CreateAdminAccount(req.body as IAdmin);
      this.sendResponse(res, httpStatus.CREATED, {
        success: true,
        message: "Admin created",
        data: null,
      });
    }
  );

  // AdminAccountLoginController = this.wrapAsync(
  //   async (req: Request, res: Response, _: NextFunction) => {
  //     const token = await this.AdminService.LoginAdminAccount(
  //       req.body as IAdmin
  //     );
  //     this.sendResponse(res, httpStatus.OK, {
  //       success: true,
  //       message: "Login success",
  //       data: token,
  //     });
  //   }
  // );

  // VerifyTokenController = this.wrapAsync(
  //   async (req: Request, res: Response, _: NextFunction) => {
  //     const { token } = req.body;
  //     const { user } = res.locals;
  //     const apiToken = await this.AdminService.VerifyToken(token, user);
  //     this.sendResponse(res, httpStatus.OK, {
  //       success: true,
  //       message: "Token verified",
  //       data: apiToken,
  //     });
  //   }
  // );

  // ChangePasswordController = this.wrapAsync(
  //   async (req: Request, res: Response, _: NextFunction) => {
  //     const { userId } = req.query;
  //     const { password } = req.body;
  //     await this.AdminService.ChangePassword(userId as string, password);
  //     this.sendResponse(res, httpStatus.OK, {
  //       success: true,
  //       message: "Password changed, please login again",
  //       data: null,
  //     });
  //   }
  // );

  ClientAccountCreationController = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const {id} = res.locals.user;
      const {subscribedService} = req.body;
      await this.AdminService.CreateClientAccount(req.body as IClient, id, subscribedService);
      this.sendResponse(res, httpStatus.CREATED, {
        success: true,
        message:
          "Client account created & credentials email sent to provided email",
        data: null,
      });
    }
  );

  GetPermissionsController = this.wrapAsync(
    async (__: Request, res: Response, _: NextFunction) => {
        const permissions = Object.values(Permissions)
        this.sendResponse(res, httpStatus.OK, {
        success: true,
        message:
          "",
        data: permissions,
      });
    }
  );
}
