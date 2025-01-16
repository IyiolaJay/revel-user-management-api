import { NextFunction, Request, Response } from 'express';
import BaseController from '../../../utilities/base.controller';
import BulkUploadService from '../services/bulkUpload.service';
// import ItemRepository from '../../../repositories/item.repository';

export class BulkUploadController extends BaseController {
    private bulkUploadService: BulkUploadService;

    constructor() {
        super();
        this.bulkUploadService = new BulkUploadService();
    }

    UploadItemCSVFile = this.wrapAsync(
    async (req: Request, res: Response, _ : NextFunction) => {
      console.log(req.file);
      const items = await this.bulkUploadService.UploadItemCSVFile(req.file);
      this.sendResponse(res, 201, {
        success: true,
        message: "Items uploaded successfully",
        data: items,
      });
    });

}