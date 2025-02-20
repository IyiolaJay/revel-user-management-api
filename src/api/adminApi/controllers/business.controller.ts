import { NextFunction, Request, Response } from "express";
import BaseController from "../../../utilities/base.controller";
import BusinessRepository from "../../../repositories/business.repository";
import BusinessService from "../services/business.service";
import BusinessAdminRepository from "../../../repositories/businessAdmins.repository";
import ClientRepository from "../../../repositories/client.repository";
import { IClient } from "../../../interfaces/client.interface";
import httpStatus from "http-status";

export class BusinessController extends BaseController {
  private businessService: BusinessService;

  constructor() {
    super();
    this.businessService = new BusinessService(
      new BusinessRepository(),
      new BusinessAdminRepository(),
      new ClientRepository()
    );
  }

  CreateBusiness = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const business = req.body;
      const { id } = res.locals.user;
      const createdBusiness = await this.businessService.CreateBusiness(
        business,
        id
      );
      this.sendResponse(res, httpStatus.CREATED, {
        success: true,
        message: "Business created",
        data: createdBusiness,
      });
    }
  );

  GetBusinesses = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { offset, limit, ...filters } = req.query;
      const businesses = await this.businessService.GetBusinesses(
        isNaN(Number(offset)) ? 1 : Number(offset),
        isNaN(Number(limit)) ? 10 : Number(limit),
        filters
      );
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Businesses fetched",
        data: businesses,
      });
    }
  );

  UpdateBusiness = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { businessId } = req.params;
      const business = await this.businessService.UpdateBusiness(
        businessId!,
        req.body
      );
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Business updated",
        data: business,
      });
    }
  );

  // GetBusinessById = this.wrapAsync(
  //     async (req: Request, res: Response, _: NextFunction) => {
  //         const { businessId } = req.params;
  //         const business = await this.businessService.GetBusinessById(businessId!);
  //         this.sendResponse(res, 200, {
  //             success: true,
  //             message: "Business fetched",
  //             data: business,
  //         });
  //     }
  // );

  DeleteBusiness = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { businessId } = req.params;
      const business = await this.businessService.DeleteBusiness(businessId!);
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Business deleted",
        data: business,
      });
    }
  );

  CreateBusinessAdmin = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { businessId } = res.locals.user; //businessAdminId in this case
      const business = await this.businessService.CreateBusinessAdmin(req.body,businessId);
      this.sendResponse(res, httpStatus.CREATED, {
        success: true,
        message: "Business Admin created",
        data: business,
      });
    }
  );

  AddTapCredentials = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { businessId } = res.locals.user.metaData;
      const {secretKey} = req.body;
      await this.businessService.AddTapPaymentsCredentials(
        secretKey,
        businessId
      );
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Tap credentials added",
        data: null,
      });
    }
  );

  ClientAccountCreation = this.wrapAsync(
      async (req: Request, res: Response, _: NextFunction) => {
        const {id, metaData} = res.locals.user;

        await this.businessService.CreateClientAccount(req.body as IClient, id, metaData.businessId);
        this.sendResponse(res, httpStatus.CREATED, {
          success: true,
          message:
            "Client account created",
          data: null,
        });
      }
    );

}
