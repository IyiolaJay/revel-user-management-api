import { Request,Response, NextFunction } from "express";
import BaseController from "../../../utilities/base.controller";
import httpStatus from "http-status";
import OrderReceipt from "../../../database/models/orderReceipt";

export default class OrderController extends BaseController{
    GetOrderReceipts = this.wrapAsync(
        async (__: Request, res: Response, _: NextFunction) => {
            const orders = await OrderReceipt.find();
            // console.log(orders)
          this.sendResponse(res, httpStatus.CREATED, {
            success: true,
            message: "Fetched",
            data: orders,
          });
        }
      );
    
}