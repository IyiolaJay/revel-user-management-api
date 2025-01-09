import httpStatus from "http-status";
import {
  ICategory,
  ICategoryRepository,
} from "../../../interfaces/categories.interface";
import ApiError from "../../../utilities/error.base";

export default class CategoryService {
  private CategoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.CategoryRepository = categoryRepository;
  }

  async CreateCategory(category: ICategory) {
    let _category = await this.CategoryRepository.findOneByFilter({
      categoryName: { $regex: new RegExp(`^${category.categoryName}$`, "i") },
    });

    if (_category)
      throw new ApiError(httpStatus.CONFLICT, "Category already exists");

    _category = await this.CategoryRepository.create({
      ...category,
    });

    return _category;
  }

  async GetCategories(offset: number = 1, limit: number = 10, filters: any) {
    const categories = await this.CategoryRepository.findAll(offset, limit,filters);
    return {
      categories: categories.data,
      totalCount: categories.totalCount,
    };
  }

  async EditCategory(categoryId: string, category: ICategory) {
    let _category = await this.CategoryRepository.findById(categoryId);

    if (!_category)
      throw new ApiError(httpStatus.NOT_FOUND, "Category does not exists");

    _category = await this.CategoryRepository.update({ _id: categoryId }, category);

    return _category;
  }
}
