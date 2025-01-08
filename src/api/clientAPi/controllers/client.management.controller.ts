import { Request, Response, NextFunction } from "express";
import BaseController from "../../../utilities/base.controller";
import ClientAuthService from "../services/client.management.service";
import httpStatus from "http-status";
import ClientRepository from "../../../repositories/client.repository";

export default class ClientAuthController extends BaseController{
    private ClientService : ClientAuthService;
    
    constructor(){
        super();

        this.ClientService = new ClientAuthService(new ClientRepository());
    }


    GetAllClients = this.wrapAsync(
        async (req: Request, res: Response, _: NextFunction) => {
            const {offset, limit, ...filters} = req.query;
            const clients = await this.ClientService.FetchAllClients(Number(offset), Number(limit), filters)
            this.sendResponse(res, httpStatus.OK, {
                success: true,
                message: "Client accounts fetched",
                data: clients,
              });
        }
    )
}