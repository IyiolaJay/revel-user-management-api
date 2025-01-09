import Item from "../database/models/item.model";
import { IItem, IItemRepository } from "../interfaces/item.interface";
import GenericRepository from "./generic.repository";

export default class ItemRepository extends GenericRepository<IItem> implements IItemRepository {
    
    constructor(){
        super(Item);
    }
}