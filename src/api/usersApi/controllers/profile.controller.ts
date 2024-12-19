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
      
    
    GetAllClientProfile = this.wrapAsync(
        async (req: Request, res: Response, _: NextFunction) => {
          const {offset,limit} = req.query;
      
         const profile = await this.UserProfileService.GetAllClients(Number(offset), Number(limit));
          this.sendResponse(res, httpStatus.OK, {
            success: true,
            message: "Clients profile fetch",
            data: profile,
          });
        }
      );
    
    
      EditClientProfile = this.wrapAsync(
        async (req: Request, res: Response, _: NextFunction) => { 
          const {clientId} = req.params;

          await this.UserProfileService.EditClientProfileData(req.body, clientId ?? "");
          this.sendResponse(res, httpStatus.OK, {
            success: true,
            message: "Profile Updated",
            data: null,
          });
        }
      );

      GetClientById = this.wrapAsync(
        async (req: Request, res: Response, _: NextFunction) => { 
          const {clientId} = req.params;

          await this.UserProfileService.GetClientById(clientId as string);
          this.sendResponse(res, httpStatus.OK, {
            success: true,
            message: "Client fetched",
            data: null,
          });
        }
      );
}