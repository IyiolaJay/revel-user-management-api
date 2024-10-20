import { Request, Response, NextFunction } from "express";
import BaseController from "../../../utilities/base.controller";
import AdminService from "../services/auth.service";
import { IAdmin } from "../../../interfaces/admin.interface";
import AdminRepository from "../../../repositories/admin.repository";
import httpStatus from "http-status";

export default class AdminAuthController extends BaseController{
    private AdminService : AdminService;
    
    constructor(){
        super();

        this.AdminService = new AdminService(new AdminRepository());
    }

    AdminAccountCreationController = this.wrapAsync(
        async (req: Request, res: Response, _: NextFunction) => {
            await this.AdminService.CreateAdminAccount(req.body as IAdmin)
            this.sendResponse(res, httpStatus.NO_CONTENT, {
                success: true,
                message: "Admin created",
                data: null,
              });
        }
    )

    AdminAccountLoginController = this.wrapAsync(
        async (req: Request, res: Response, _: NextFunction) => {
            const token = await this.AdminService.LoginAdminAccount(req.body as IAdmin)
            this.sendResponse(res, httpStatus.OK, {
                success: true,
                message: "Login success",
                data: token,
              });
        }
    )

    VerifyTokenController = this.wrapAsync(
        async (req: Request, res: Response, _: NextFunction) => {
            const {token} = req.body;
            const {user} = res.locals
            const apiToken = await this.AdminService.VerifyToken(token, user)
            this.sendResponse(res, httpStatus.OK, {
                success: true,
                message: "Token verified",
                data: apiToken,
              });
        }
    )
}