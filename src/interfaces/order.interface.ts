import IGenericRepository from "./generic.repository.interface";

export  interface IOrderReceipt {
    establishmentId : number;
    orderItems : object;
    orderReceipt : object;
    clientId : string;
}

export interface IOrderRepository extends IGenericRepository<IOrderReceipt>{
    bulkcreateOrderReceipts(orders : IOrderReceipt[]) : Promise<void>;
}