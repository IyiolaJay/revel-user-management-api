import { Request, Response, NextFunction } from "express";
import BaseController from "../../../utilities/base.controller";
import httpStatus from "http-status";
import OrderService from "../services/order.service";
import OrderRepository from "../../../repositories/order.repository";
import ClientRepository from "../../../repositories/client.repository";

export default class OrderController extends BaseController {
  private orderService: OrderService;
  constructor() {
    super();
    this.orderService = new OrderService(
      new OrderRepository(),
      new ClientRepository()
    );
  }

  //
  GetEstablishmentOrderReceipts = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { offset, limit, establishmentId, ...filters } = req.query;
      const { id } = res.locals.user;
      const pageLimit = isNaN(Number(limit)) ? 20 : Number(limit);
      const orders = await this.orderService.GetEstablishmentOrderReceipts(
        Number(offset),
        pageLimit,
        Number(establishmentId) ?? null,
        id,
        filters
      );
      console.log(orders.data.length);
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Orders fetched",
        data: orders,
      });
    }
  );
}
