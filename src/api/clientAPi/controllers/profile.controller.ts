import { Request, Response, NextFunction } from "express";
import BaseController from "../../../utilities/base.controller";
import ClientProfileService from "../services/profile.service";
import httpStatus from "http-status";
import ClientRepository from "../../../repositories/client.repository";

export default class ClientProfileController extends BaseController{
    private ClientProfileService: ClientProfileService;

    constructor() {
      super();
  
      this.ClientProfileService = new ClientProfileService(
        new ClientRepository(),
      );
    }

    GetProfile = this.wrapAsync(
        async (__: Request, res: Response, _: NextFunction) => {
         const { id } = res.locals.user;

         const profile = await this.ClientProfileService.GetProfile(id);
          this.sendResponse(res, httpStatus.OK, {
            success: true,
            message: "",
            data: profile,
          });
        }
      );
}