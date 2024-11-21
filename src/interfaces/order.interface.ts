import IGenericRepository from "./generic.repository.interface";

export  interface IOrderReceipt {
    // distributor_tin :  string;
    // qr_code : string;
    // message : object;
    orderItems : object;
    orderReceipt : object
}

export interface IOrderRepository extends IGenericRepository<IOrderReceipt>{
    bulkcreateOrderReceipts(orders : IOrderReceipt[]) : Promise<void>;
}