import GenericRepository from "./generic.repository";
import { IClient, IClientRepository } from "../interfaces/client.interface";
import Client from "../database/models/client.model";
import { Model } from "mongoose";

export default class ClientRepository extends GenericRepository<IClient> implements IClientRepository{
    private ClientModel : Model<IClient>;
    constructor(){
        super(Client)
        this.ClientModel = Client;
    }
    
    async getClientAndActiveServices(): Promise<any> {
        await this.ClientModel.find();
        throw new Error("Method not implemented.");
    }
    
}