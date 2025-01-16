import { Request, Response, NextFunction } from "express";
import BaseController from "../../../utilities/base.controller";
import InvoiceService from "../services/invoice.service";
import InvoiceRepository from "../../../repositories/invoice.repository";
import httpStatus from "http-status";
import ClientRepository from "../../../repositories/client.repository";

export default class InvoiceController extends BaseController {
  private invoiceService: InvoiceService;

  constructor() {
    super();
    this.invoiceService = new InvoiceService(
      new InvoiceRepository(),
      new ClientRepository()
    );
  }

  createInvoice = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const invoice = req.body;
      const { id } = res.locals.user;
      const createdInvoice = await this.invoiceService.CreateInvoice(
        invoice,
        id
      );
      this.sendResponse(res, httpStatus.CREATED, {
        success: true,
        message: "Invoice created",
        data: createdInvoice,
      });
    }
  );

  getInvoices = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { offset, limit, ...filters } = req.query;
      const invoices = await this.invoiceService.GetInvoices(
        isNaN(Number(offset)) ? 1 : Number(offset),
        isNaN(Number(limit)) ? 10 : Number(limit),
        filters
      );
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Invoices fetched",
        data: invoices,
      });
    }
  );

  editInvoice = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const { invoiceId } = req.params;
      const invoice = req.body;
      const updatedInvoice = await this.invoiceService.EditInvoice(
        invoiceId!,
        invoice
      );
      this.sendResponse(res, httpStatus.OK, {
        success: true,
        message: "Invoice updated",
        data: updatedInvoice,
      });
    }
  );

  getNextInvoiceNumber = this.wrapAsync(
    async (req: Request, res: Response, _: NextFunction) => {
      const invoiceType = (req.query.invoiceType as string) || "invoice";
      const nextInvoiceNumber = await this.invoiceService.GetNextInvoiceNumber(
        invoiceType
      );
      this.sendResponse(res, 200, {
        success: true,
        message: "Next invoice number fetched",
        data: { nextInvoiceNumber },
      });
    }
  );
}
