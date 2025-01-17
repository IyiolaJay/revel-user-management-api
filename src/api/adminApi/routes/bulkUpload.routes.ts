// import express, { Router } from "express";
// import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
// import PermissionValidation from "../../../middlewares/permission.middleware";
// import { Permissions } from "../../../utilities/enums/permissions.enum";
import BaseRoute from "../../../utilities/base.router";
import MulterMediaHandler from "../../../middlewares/multer.middleware";
import { BulkUploadController } from "../controllers/bulkUpload.controller";

export default class BulkUploadRoutes extends BaseRoute{
  constructor() {
   super();
 
  }

  protected setupRoutes(): void {
    const bulkUploadController = new BulkUploadController();
    // const authenticationMiddleware = new AuthenticationMiddleware();
    const multerMediaHandler = new MulterMediaHandler();

    
    this.router.post(
      "/upload",
    //   authenticationMiddleware.AuthorizeUser,
    //   PermissionValidation.PermissionMiddleware([Permissions.CREATE_CLIENT]),
      multerMediaHandler.UploadSingleCSVFile(),
      bulkUploadController.UploadItemCSVFile
    );

    this.router.post(
      "/validateFields",
    //   authenticationMiddleware.AuthorizeUser,
    //   PermissionValidation.PermissionMiddleware([Permissions.CREATE_CLIENT]),
      multerMediaHandler.UploadSingleCSVFile(),
      bulkUploadController.ValidateUploadFields
    );
  }
}


