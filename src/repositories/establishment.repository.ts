import Establishment from "../database/models/establishment.model";
import { IEstablishment, IEstablishmentRepository } from "../interfaces/establishment.interface";
import GenericRepository from "./generic.repository";

export default class EstablishmentRepository extends GenericRepository<IEstablishment> implements IEstablishmentRepository
{

    constructor(){
        super(Establishment)
    }
}