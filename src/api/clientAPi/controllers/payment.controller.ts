import httpStatus from "http-status";
import BaseController from "../../../utilities/base.controller";
import { Response, Request, NextFunction } from "express";
export default class PaymentController extends BaseController{
     constructor() {
        super();
      }

      TapPaymentCallback = this.wrapAsync(
          async (__: Request, res: Response, _: NextFunction) => {
            this.sendResponse(res, httpStatus.OK, {
              success: true,
              message: "Payment Success",
              data: [],
            });
          }
        );
}