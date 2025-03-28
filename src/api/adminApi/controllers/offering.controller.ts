import { NextFunction, Request, Response } from "express";
import BaseController from "../../../utilities/base.controller";
import OfferingService from "../services/offering.service";
import CategoryRepository from "../../../repositories/category.repository";
import OfferingRepository from "../../../repositories/offering.repository";

export default class OfferingController extends BaseController {
  private offeringService: OfferingService;

  constructor() {
    super();
    this.offeringService = new OfferingService(
      new OfferingRepository(),
      new CategoryRepository()
    );
  }

  CreateOffering = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { categoryName, ...offering } = req.body;
      const createdItem = await this.offeringService.CreateOffering(offering, categoryName);
      this.sendResponse(res, 201, {
        success: true,
        message: "Offering created",
        data: createdItem,
      });
    }
  );

  GetOfferings = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { offset, limit, ...filters } = req.query;
      const offerings = await this.offeringService.GetOfferings(
        isNaN(Number(offset)) ? 1 : Number(offset),
        isNaN(Number(limit)) ? 1 : Number(limit),
        filters
      );
      this.sendResponse(res, 200, {
        success: true,
        message: "Offerings fetched",
        data: offerings,
      });
    }
  );

  EditOffering = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { offeringId } = req.params;
      const offering = await this.offeringService.EditOffering(offeringId!, req.body);
      this.sendResponse(res, 200, {
        success: true,
        message: "Offering updated",
        data: offering,
      });
    }
  );
}
