import { NextFunction, Request, Response } from 'express';
import BaseController from '../../../utilities/base.controller';
import ItemRepository from '../../../repositories/item.repository';
import ItemService from '../services/item.service';
import CategoryRepository from '../../../repositories/category.repository';

export class ItemController extends BaseController {
    private itemService: ItemService;

    constructor() {
        super();
        this.itemService = new ItemService(new ItemRepository(), new CategoryRepository());
    }

    CreateItem = this.wrapAsync(
        async (req: Request, res: Response, _: NextFunction) => {
            const { categoryName, ...item } = req.body;
            const createdItem = await this.itemService.CreateItem(item, categoryName);
            this.sendResponse(res, 201, {
                success: true,
                message: "Item created",
                data: createdItem,
            });
        }
    );

    GetItems = this.wrapAsync(
        async (req: Request, res: Response, _: NextFunction) => {
            const { offset, limit, ...filters } = req.query;
            const items = await this.itemService.GetItems(
                isNaN(Number(offset)) ? 1 : Number(offset),
                isNaN(Number(limit)) ? 1 : Number(limit),
                filters
            );
            this.sendResponse(res, 200, {
                success: true,
                message: "Items fetched",
                data: items,
            });
        }
    );

    EditItem = this.wrapAsync(
        async (req: Request, res: Response, _: NextFunction) => {
            const { itemId } = req.params;
            const item = await this.itemService.EditItem(itemId!, req.body);
            this.sendResponse(res, 200, {
                success: true,
                message: "Item updated",
                data: item,
            });
        }
    );
}