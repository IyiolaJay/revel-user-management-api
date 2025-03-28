import httpStatus from "http-status";
import { IOffering, IOfferingRepository } from "../../../interfaces/offering.interface";
import ApiError from "../../../utilities/error.base";
import { ICategoryRepository } from "../../../interfaces/categories.interface";

export default class OfferingService {
  private offeringRepository: IOfferingRepository;
  private CategoryRepository: ICategoryRepository;

  constructor(
    offeringRepository: IOfferingRepository,
    categoryRepository: ICategoryRepository
  ) {
    this.offeringRepository = offeringRepository;
    this.CategoryRepository = categoryRepository;
  }

  async CreateOffering(offering: IOffering, categoryName: string) {
    let _offering = await this.offeringRepository.findOneByFilter({
      name: { $regex: new RegExp(`^${offering.name}$`, "i") },
    });

    if (_offering) throw new ApiError(httpStatus.CONFLICT, "Offering already exists");

    let _category = await this.CategoryRepository.findOneByFilter({
      categoryName: { $regex: new RegExp(`^${categoryName}$`, "i") },
    });

    //create the category on the fly if it doesn't exist
    if (!_category) {
      _category = await this.CategoryRepository.create({
        categoryName: categoryName,
        businessId: "",
      });
    }

    _offering = await this.offeringRepository.create({
      ...offering,
      categoryId: _category._id! as any,
    });

    return _offering;
  }

  async GetOfferings(offset: number = 1, limit: number = 10, filters: any) {
    const offerings = await this.offeringRepository.findAll(offset, limit, filters);
    return {
      offerings: offerings.data,
      totalCount: offerings.totalCount,
    };
  }

  async EditOffering(offeringId: string, offering: IOffering) {
    const _offering = await this.offeringRepository.update({ _id: offeringId }, offering);
    if (!_offering) throw new ApiError(httpStatus.NOT_FOUND, "Item does not exist");

    return _offering;
  }
}
