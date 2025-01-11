import { Model } from "mongoose";
import invoice from "../database/models/invoice.model";
import { ICounter, IInvoice, IInvoiceRepository } from "../interfaces/invoice.interface"
import GenericRepository from "./generic.repository"
import Counter from "../database/models/counter.model";

export default class InvoiceRepository extends GenericRepository<IInvoice> implements IInvoiceRepository{
    private CounterModel : Model<ICounter>;
    private InvoiceModel : Model<IInvoice>;
    constructor(){
        super(invoice);
        this.CounterModel = Counter;
        this.InvoiceModel = invoice;
    }
    
    async getNextInvoiceOrEstimateNumber(invoiceType : string): Promise<string> {
        const lastInvoice = await this.CounterModel.findOne({name : invoiceType}).sort({ createdAt: -1 });
        let nextInvoiceNumber = (lastInvoice ? lastInvoice.seq + 1 : 1).toString().padStart(10, '0');
        return  invoiceType === "invoice" ? `INV_${nextInvoiceNumber}` : `EST_${nextInvoiceNumber}`;
    }

     createInvoiceInstance(invoiceData: IInvoice): IInvoice {
        return new this.InvoiceModel(invoiceData);
    }
}