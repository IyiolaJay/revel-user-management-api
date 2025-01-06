import { Request, Response, NextFunction } from "express";
import BaseController from "../../../utilities/base.controller";
import httpStatus from "http-status";
import OrderService from "../services/order.service";
import OrderRepository from "../../../repositories/order.repository";

export default class OrderController extends BaseController {
  private orderService: OrderService;
  constructor() {
    super();
    this.orderService = new OrderService(new OrderRepository());
  }
  GetOrderReceipts = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const  { offset, limit, ...filters } = req.query;
      let pageLimit = isNaN(limit as any) ? 20 : Number(limit); //handle case when limit is not passed
      const orders = await this.orderService.GetOrderReceipts(
        Number(offset),
        pageLimit,
        filters,
      );
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Fetched",
        data: orders,
      });
    }
  );

  CreateOrderReceipts = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      // console.log(orders)
      await this.orderService.CreateNewOrderReceipt(req.body.items);
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Create",
        data: null,
      });
    }
  );
}
