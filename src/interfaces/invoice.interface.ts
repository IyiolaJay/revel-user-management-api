import IGenericRepository from "./generic.repository.interface";

export interface IInvoice {
    invoiceNumber: string;
    tapInvoiceId: number;
    invoiceUrl : string;
    draft: boolean;
    due: number;
    expiry: number;
    description: string;
    mode: string;
    note: string;
    notifications: {
        channels: string[];
        dispatch: boolean;
    };
    metadata: {
        udf1: string;
        udf2: string;
        udf3: string;
    };
    charge: {
        receipt: {
            email: boolean;
            sms: boolean;
        };
    };
    customer: object; 
    statement_descriptor: string;
    order: {
        amount: number;
        items: object[];
        currency: string;
    };
    post: {
        url: string;
    };
    redirect: {
        url: string;
    };
    reference: {
        invoice: string;
        order: string;
    };
    retry_for_captured: boolean;
    createdBy : string
}


export interface ICounter {
    seq: number;
    name: string;
  }

export interface IInvoiceRepository extends IGenericRepository<IInvoice> {
    getNextInvoiceOrEstimateNumber(itemType : string): Promise<string>;
    createInvoiceInstance(invoiceData: IInvoice): IInvoice;
}