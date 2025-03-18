import { NextFunction, Request, Response } from 'express';
import CategoryService from '../services/category.service';
import BaseController from '../../../utilities/base.controller';
import CategoryRepository from '../../../repositories/category.repository';

export class CategoryController extends BaseController {
    private categoryService: CategoryService;

    constructor() {
        super();
        this.categoryService = new CategoryService(new CategoryRepository());
    }

   CreateCategory = this.wrapAsync(
    async (req: Request, res: Response, _ : NextFunction) => {
      const {businessId} = res.locals.user.metadata;
      const category = await this.categoryService.CreateCategory({...req.body, businessId: businessId});
      this.sendResponse(res, 201, {
        success: true,
        message: "Category created",
        data: category,
      });
    });


    GetCategories = this.wrapAsync(
        async (req: Request, res: Response, _ : NextFunction) => {
          const { offset, limit, ...filters } = req.query;
          const categories = await this.categoryService.GetCategories(
            isNaN(Number(offset)) ? 1 : Number(offset), 
            isNaN(Number(limit)) ? 1 : Number(limit), 
            filters
            );
          this.sendResponse(res, 200, {
            success: true,
            message: "Categories fetched",
            data: categories,
          });
        });

    EditCategory = this.wrapAsync(
        async (req: Request, res: Response, _ : NextFunction) => {
          const {categoryId} = req.params;
          const category = await this.categoryService.EditCategory(categoryId!, req.body);
          this.sendResponse(res, 200, {
            success: true,
            message: "Category updated",
            data: category,
          });
        });
}