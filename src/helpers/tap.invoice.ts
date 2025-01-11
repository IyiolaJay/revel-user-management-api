import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IInvoice } from '../interfaces/invoice.interface';
import config from 'config';

export default class TapInvoiceCallService {
    private axiosInstance: AxiosInstance;
    private baseUrl =config.get("TAP_BASE_URL");
    private _tapConfig : AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${config.get("TAP_API_KEY")}`,
            Accept: 'application/json',
            'content-type': 'application/json',
          }
    }

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;

    }

    async createInvoice(invoiceData: IInvoice): Promise<any> {
        try {
            const response  = await this.axiosInstance.post(`${this.baseUrl}/invoices/`, invoiceData, this._tapConfig);
            return response.data ;
        } catch (error : any) {
            console.log(error.response.data);
            throw new Error(`Error creating invoice: ${error.message}`);
        }
    }

    // async getInvoice(invoiceId: string): Promise<any> {
    //     try {
    //         const response = await this.axiosInstance.get(`${this.baseUrl}/invoices/${invoiceId}`, this._tapConfig);
    //         return response.data;
    //     } catch (error : any) {
    //         throw new Error(`Error fetching invoice: ${error.message}`);
    //     }
    // }

    // async getInvoiceByInvoiceNumber(invoiceNumber: string): Promise<any> {
    //     try {
    //         const response = await this.axiosInstance.get(`/invoices`, {
    //             params: { invoiceNumber }
    //         });
    //         return response.data;
    //     } catch (error : any) {
    //         throw new Error(`Error fetching invoice by number: ${error.message}`);
    //     }
    // }
}
