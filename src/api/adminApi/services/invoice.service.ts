import httpStatus from "http-status";
import { IInvoice, IInvoiceRepository } from "../../../interfaces/invoice.interface";
import ApiError from "../../../utilities/error.base";
import TapInvoiceCallService from "../../../helpers/tap.invoice";
import axios from "axios";
import EmailService from "../../../email/emailer";
import { EmailType } from "../../../utilities/enums/enum";
import { IClientRepository } from "../../../interfaces/client.interface";
import SecurityHelperService from "../../../helpers/security";

export default class InvoiceService {
    private InvoiceRepository: IInvoiceRepository;
    private clientRepository : IClientRepository;
    private tapInvoiceCallService: TapInvoiceCallService = new TapInvoiceCallService(axios);
    private emailService = new EmailService();
    private SecurityHelperService : SecurityHelperService = new SecurityHelperService()
    


    constructor(invoiceRepository: IInvoiceRepository, clientRepository : IClientRepository) {
        this.InvoiceRepository = invoiceRepository;
        this.clientRepository = clientRepository;
    }

    async CreateInvoice(invoice: IInvoice, userId: string) {
        let _invoice = await this.InvoiceRepository.findOneByFilter({
            invoiceNumber: { $regex: new RegExp(`^${invoice.invoiceNumber}$`, "i") },
        });

        if (_invoice)
            throw new ApiError(httpStatus.CONFLICT, "Invoice already exists");

        const client =await this.clientRepository.findById(invoice.clientId);

        if (!client)
            throw new ApiError(httpStatus.NOT_FOUND, "Client does not exist");



        //create invoice on tap
        const invoiceNumber = await this.InvoiceRepository.getNextInvoiceOrEstimateNumber(invoice.draft ? "estimate" : "invoice");
        _invoice = {
            ...invoice,
            invoiceNumber,
        }

        const invoiceInstance : any = this.InvoiceRepository.createInvoiceInstance({
            ...invoice,
            reference : {
                order : `ORD_${invoiceNumber.split("_")[1]}`,
                invoice : invoiceNumber
            },
            createdBy : userId
        });
        
        const tapInvoice = await this.tapInvoiceCallService.createInvoice(invoiceInstance);
        
        _invoice = await this.InvoiceRepository.create({
            ...invoiceInstance._doc,
            tapInvoiceId : tapInvoice.invoice_number,
            invoiceUrl : tapInvoice.url,
        });


        const token = await this.SecurityHelperService.GenerateJWT({
            id : userId,
            accountType : "client",
            role : "",
            permissions : []
        },
         "90d"
        )

            this.emailService.SendEMailToUser({
                to : client.email,
                bodyParts : {
                    name : client.first_name,
                    invoiceNumber : _invoice.invoiceNumber,
                    amount : _invoice.order.amount,
                    due : _invoice.due,
                    type : _invoice.draft ? 'estimate' : "invoice",
                    userId,
                    invoiceUrl :_invoice.invoiceUrl,
                    onboardUrl : `https://www.edartee.com/?token=${token}` // replace with env var
                },},
                EmailType.InvoiceEmail)
        
        return _invoice;
    }

    async GetInvoices(offset: number = 1, limit: number = 10, filters: any) {
        const invoices = await this.InvoiceRepository.findAll(offset, limit, filters);
        return {
            invoices: invoices.data,
            totalCount: invoices.totalCount,
        };
    }

    async EditInvoice(invoiceId: string, invoice: IInvoice) {
        let _invoice = await this.InvoiceRepository.findById(invoiceId);

        if (!_invoice)
            throw new ApiError(httpStatus.NOT_FOUND, "Invoice does not exist");

        _invoice = await this.InvoiceRepository.update({ _id: invoiceId }, invoice);

        return _invoice;
    }

    async GetNextInvoiceNumber(invoiceType: string = "invoice") {
        return await this.InvoiceRepository.getNextInvoiceOrEstimateNumber(invoiceType);
    }
}