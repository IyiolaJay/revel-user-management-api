import httpStatus from "http-status";
import { IItem, IItemRepository } from "../../../interfaces/item.interface";
import ApiError from "../../../utilities/error.base";
import { ICategoryRepository } from "../../../interfaces/categories.interface";
import { Schema } from "mongoose";

export default class ItemService {
private ItemRepository: IItemRepository;
private CategoryRepository: ICategoryRepository;

constructor(itemRepository: IItemRepository, categoryRepository: ICategoryRepository) {
    this.ItemRepository = itemRepository;
    this.CategoryRepository = categoryRepository;
}

async CreateItem(item: IItem, categoryName: string) {
    let _item = await this.ItemRepository.findOneByFilter({
        itemName: { $regex: new RegExp(`^${item.itemName}$`, "i") },
    });

    if (_item)
        throw new ApiError(httpStatus.CONFLICT, "Item already exists");


    let _category = await this.CategoryRepository.findOneByFilter({
        categoryName: { $regex: new RegExp(`^${categoryName}$`, "i") },
    });

    //create the category on the fly if it doesn't exist
    if (!_category){
        _category = await this.CategoryRepository.create({
            categoryName: categoryName,
        });
    }
    
    _item = await this.ItemRepository.create({
        ...item,
        categoryId: new Schema.Types.ObjectId(_category._id!),
    });

    return _item;
}

async GetItems(offset: number = 1, limit: number = 10, filters: any) {
    const items = await this.ItemRepository.findAll(offset, limit, filters);
    return {
        items: items.data,
        totalCount: items.totalCount,
    };
}

async EditItem(itemId: string, item: IItem) {
    let _item = await this.ItemRepository.findById(itemId);

    if (!_item)
        throw new ApiError(httpStatus.NOT_FOUND, "Item does not exist");

    _item = await this.ItemRepository.update({ _id: itemId }, item);

    return _item;
}
}