import { Request, Response, NextFunction } from "express";
import ServiceRepository from "../../../repositories/service.repository";
import BaseController from "../../../utilities/base.controller";
import ServicesService from "../services/services.service";
import httpStatus from "http-status";

export default class ServiceController extends BaseController {
  private ServicesService: ServicesService;
  constructor() {
    super();
    this.ServicesService = new ServicesService(new ServiceRepository());
  }

  CreateService = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { id } = res.locals.user;
      await this.ServicesService.CreateService(req.body, id);
      this.sendResponse(res, httpStatus.CREATED, {
        success: true,
        message: "",
        data: null,
      });
    }
  );

  GetAllService = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { offset, limit } = req.query;
      const allServices = await this.ServicesService.GetAllServices(
        Number(offset),
        Number(limit)
      );
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "",
        data: allServices,
      });
    }
  );
  
  GetServiceById =  this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { serviceId } = req.params;
      const allServices = await this.ServicesService.GetServiceById(serviceId ?? "");
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Service Fetched",
        data: allServices,
      });
    }
  );


  EditService = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { serviceId } = req.params;
      await this.ServicesService.EditService(req.body, serviceId ?? "");
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Service Edited",
        data: null,
      });
    }
  );
}
