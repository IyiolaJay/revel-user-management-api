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

    UpdateClient = this.wrapAsync(
        async (req: Request, res: Response, _: NextFunction) => {
            const { clientId } = req.params;
            const clientData = req.body;
            const updatedClient = await this.ClientService.updateClient(clientId as string, clientData);
            this.sendResponse(res, httpStatus.OK, {
                success: true,
                message: "Client account updated",
                data: updatedClient,
            });
        }
    )
    UpgradeCustomerAccount = this.wrapAsync(
        async (req: Request, res: Response, _: NextFunction) => {
            const { clientId } = req.params;
            await this.ClientService.upgradeCustomerAccount(clientId as string);
            this.sendResponse(res, httpStatus.OK, {
                success: true,
                message: "Customer account upgraded",
                data: null,
            });
        }
    )
}