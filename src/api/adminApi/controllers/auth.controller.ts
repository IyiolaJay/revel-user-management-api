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

  ClientAccountCreationController = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const {id} = res.locals.user;
      const {subscribedService} = req.body;
      await this.AdminService.CreateClientAccount(req.body as IClient, id, subscribedService);
      this.sendResponse(res, httpStatus.CREATED, {
        success: true,
        message:
          "Client account created",
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

  UpdateAdminAccount = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const {adminId} = req.params;
      const admin = await this.AdminService.UpdateAdminAccount(adminId!, req.body);
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message:
          "Admin account modified",
        data: admin,
      });
    }
  );

  GetAdmins = this.wrapAsync(
      async (req: Request, res: Response, _: NextFunction) => {
        const { offset, limit, ...filters } = req.query;
        let pageLimit = isNaN(limit as any) ? 20 : Number(limit); //handle case when limit is not passed
        const admins = await this.AdminService.GetAllAdmins(
          Number(offset),
          pageLimit,
          filters,
        );
        this.sendResponse(res, httpStatus.OK, {
          success: true,
          message: "Fetched",
          data: admins,
        });
      }
    );
}
