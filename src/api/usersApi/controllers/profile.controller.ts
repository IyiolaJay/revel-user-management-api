import { Request, Response, NextFunction } from "express";
import AdminRepository from "../../../repositories/admin.repository";
import BaseController from "../../../utilities/base.controller";
import UserProfileService from "../services/profile.service";
import httpStatus from "http-status";
import ClientRepository from "../../../repositories/client.repository";

export default class UserProfileController extends BaseController{
    private UserProfileService: UserProfileService;

    constructor() {
      super();
  
      this.UserProfileService = new UserProfileService(
        new AdminRepository(),
        new ClientRepository()
      );
    }

    GetAuthenticatedProfile = this.wrapAsync(
        async (__: Request, res: Response, _: NextFunction) => {
         const { id, accountType } = res.locals.user;
      
         const profile = await this.UserProfileService.GetProfile(id, accountType);
          this.sendResponse(res, httpStatus.OK, {
            success: true,
            message: "",
            data: profile,
          });
        }
      );
}