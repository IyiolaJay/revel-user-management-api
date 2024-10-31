import { Request, Response, NextFunction } from "express";
import BaseController from "../../../utilities/base.controller";
import ClientAuthService from "../services/clientAuth.service";
import httpStatus from "http-status";
import { IClient } from "../../../interfaces/client.interface";
import ClientRepository from "../../../repositories/client.repository";

export default class ClientAuthController extends BaseController{
    private ClientService : ClientAuthService;
    
    constructor(){
        super();

        this.ClientService = new ClientAuthService(new ClientRepository());
    }


    ClientAccountLoginController = this.wrapAsync(
        async (req: Request, res: Response, _: NextFunction) => {
            const token = await this.ClientService.LoginClientAccount(req.body as IClient)
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
            const apiToken = await this.ClientService.VerifyToken(token, user)
            this.sendResponse(res, httpStatus.OK, {
                success: true,
                message: "Token verified",
                data: apiToken,
              });
        }
    )


    ChangePasswordController = this.wrapAsync(
        async (req: Request, res: Response, _: NextFunction) => {
            const {userId} = req.query;
            const {password} = req.body
            await this.ClientService.ChangePassword(userId as string, password)
            this.sendResponse(res, httpStatus.OK, {
                success: true,
                message: "Password changed, please login again",
                data: null,
              });
        }
    )
}