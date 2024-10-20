import GenericRepository from "./generic.repository";
import { IClient, IClientRepository } from "../interfaces/client.interface";
import Client from "../database/models/client.model";

export default class ClientRepository extends GenericRepository<IClient> implements IClientRepository{
    constructor(){
        super(Client)
     
    }
    
}