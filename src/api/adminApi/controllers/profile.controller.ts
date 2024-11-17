import { Request, Response, NextFunction } from "express";
import AdminRepository from "../../../repositories/admin.repository";
import BaseController from "../../../utilities/base.controller";
import AdminProfileService from "../services/profile.service";
import httpStatus from "http-status";

export default class AdminProfileController extends BaseController{
    private AdminProfileService: AdminProfileService;

    constructor() {
      super();
  
      this.AdminProfileService = new AdminProfileService(
        new AdminRepository(),
      );
    }

    GetProfile = this.wrapAsync(
        async (__: Request, res: Response, _: NextFunction) => {
         const { id } = res.locals.user;

         const profile = await this.AdminProfileService.GetProfile(id);
          this.sendResponse(res, httpStatus.OK, {
            success: true,
            message: "",
            data: profile,
          });
        }
      );
}