import { NextFunction, Request, Response } from "express";
import BaseController from "../../../utilities/base.controller";
import BusinessRepository from "../../../repositories/business.repository";
import BusinessManagementService from "../services/business.managament.service";
import BusinessAdminRepository from "../../../repositories/businessAdmins.repository";
import httpStatus from "http-status";

export default class BusinessController extends BaseController {
  private BusinessManagementService: BusinessManagementService;

  constructor() {
    super();
    this.BusinessManagementService = new BusinessManagementService(
      new BusinessRepository(),
      new BusinessAdminRepository(),
    );
  }

  CreateBusinessAdmin = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { businessId } = res.locals.user; //businessAdminId in this case
      const business = await this.BusinessManagementService.CreateBusinessAdmin(req.body,businessId);
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
      await this.BusinessManagementService.AddTapPaymentsCredentials(
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
}
