import httpStatus from "http-status";
import BaseController from "../../../utilities/base.controller";
import { Response, Request, NextFunction } from "express";
import PaymentService from "../services/payment.service";
import PaymentRepository from "../../../repositories/payment.repository";
export default class PaymentController extends BaseController{
     private paymentService: PaymentService = new PaymentService(new PaymentRepository());
     constructor() {
        super();
      }

      TapPaymentCallback = this.wrapAsync(
          async (req: Request, res: Response, _: NextFunction) => {
            console.log("Payment Callback", req.body);
            this.sendResponse(res, httpStatus.OK, {
              success: true,
              message: "Payment Success",
              data: [],
            });
          }
        );
      
      
        UploadPaymentProof = this.wrapAsync(
          async (req: Request, res: Response, _: NextFunction) => {

            await this.paymentService.UploadPaymentProof(req.body);
            this.sendResponse(res, httpStatus.OK, {
              success: true,
              message: "Payment Success",
              data: [],
            });
          }
        );
}