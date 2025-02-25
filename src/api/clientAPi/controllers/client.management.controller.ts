import { Request, Response, NextFunction } from "express";
import BaseController from "../../../utilities/base.controller";
import ClientAuthService from "../services/client.management.service";
import httpStatus from "http-status";
import ClientRepository from "../../../repositories/client.repository";
import { IClient } from "../../../interfaces/client.interface";

export default class ClientAuthController extends BaseController {
  private ClientService: ClientAuthService;

  constructor() {
    super();

    this.ClientService = new ClientAuthService(
      new ClientRepository(),
    );
  }

  ClientAccountCreation = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const {id, metaData} = res.locals.user;

      await this.ClientService.CreateClientAccount(req.body as IClient, id, metaData.businessId);
      this.sendResponse(res, httpStatus.CREATED, {
        success: true,
        message:
          "Client account created",
        data: null,
      });
    }
  );

  GetAllClients = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { offset, limit, ...filters } = req.query;
      const {businessId}  = res.locals.user.metaData;
      const clients = await this.ClientService.FetchAllClients(
        Number(offset),
        Number(limit),
        {
          ...filters,
          businessId
        },
      );
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Client accounts fetched",
        data: clients,
      });
    }
  );

  UpdateClient = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { clientId } = req.params;
      const clientData = req.body;
      const updatedClient = await this.ClientService.updateClient(
        clientId as string,
        clientData
      );
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Client account updated",
        data: updatedClient,
      });
    }
  );

  UpdateClientPassword = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { id } = res.locals.user;
      const { password } = req.body;
      await this.ClientService.updateClientPassword(
        id as string,
        password
      );
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Customer account upgraded",
        data: null,
      });
    }
  );

  SearchClient = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { offset, limit, searchText } = req.query;
      const clients = await this.ClientService.searchClient(
        isNaN(Number(offset)) ? 1 : Number(offset),
        isNaN(Number(limit)) ? 20 : Number(limit),
        searchText as string
      );
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Client search results",
        data: clients,
      });
    }
  );
}
