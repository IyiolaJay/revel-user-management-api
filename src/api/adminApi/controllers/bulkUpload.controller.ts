import { NextFunction, Request, Response } from "express";
import BaseController from "../../../utilities/base.controller";
import BulkUploadService from "../services/bulkUpload.service";
import ItemRepository from "../../../repositories/item.repository";
import ClientRepository from "../../../repositories/client.repository";

export class BulkUploadController extends BaseController {
  private bulkUploadService: BulkUploadService;

  constructor() {
    super();
    this.bulkUploadService = new BulkUploadService(
      new ItemRepository(),
      new ClientRepository()
    );
  }

  UploadItemCSVFile = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { entity } = req.query;
      const items = await this.bulkUploadService.UploadItemCSVFile(
        entity as string,
        req.file
      );
      this.sendResponse(res, 201, {
        success: true,
        message: "Data uploaded successfully",
        data: items,
      });
    }
  );

  ValidateUploadFields = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { entity } = req.query;
      const items = await this.bulkUploadService.ValidateUploadCsvFields(
        entity as string,
        req.file
      );
      this.sendResponse(res, 201, {
        success: true,
        message: "Validation complete",
        data: items,
      });
    }
  );
}
