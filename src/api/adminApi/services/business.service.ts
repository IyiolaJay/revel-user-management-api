import httpStatus from "http-status";
import {
  IBusiness,
  IBusinessAdminRepository,
  IBusinessAdmins,
  IBusinessRepository,
} from "../../../interfaces/business.interface";
import ApiError from "../../../utilities/error.base";
import {
  IEstablishment,
  IEstablishmentRepository,
} from "../../../interfaces/establishment.interface";
import BusinessManagementService from "../../clientAPi/services/business.managament.service";

export default class BusinessService {
  private BusinessRepository: IBusinessRepository;
  private BusinessAdminRepository: IBusinessAdminRepository;
  private EstablishmentRepository: IEstablishmentRepository;

  constructor(
    businessRepository: IBusinessRepository,
    businessAdminRepository: IBusinessAdminRepository,
    establishmentRepository: IEstablishmentRepository
  ) {
    this.BusinessRepository = businessRepository;
    this.BusinessAdminRepository = businessAdminRepository;
    this.EstablishmentRepository = establishmentRepository;
  }

  /**
   *
   * @param business
   * @param adminId (system administrator)
   * @returns
   */
  async CreateBusiness(business: any, adminId: string) {
    let _business = await this.BusinessRepository.findOneByFilter({
      businessName: { $regex: new RegExp(`^${business.businessName}$`, "i") },
    });

    if (_business)
      throw new ApiError(httpStatus.CONFLICT, "Business already exists");

    let { establishments, ...newBusiness } = business;

    _business = await this.BusinessRepository.create({
      ...newBusiness,
      createdBy: adminId as any,
    });

    if(establishments.length > 0){
      this.EstablishmentRepository.bulkCreate(
        establishments.map((e: IEstablishment) => ({
          ...e,
          businessId: _business._id,
        }))
      );
    }

    await new BusinessManagementService(
      this.BusinessRepository,
      this.BusinessAdminRepository
    ).CreateBusinessAdmin(
      {
        adminType: "BUSINESS_SUPER_ADMIN",
        businessId: _business._id,
        email: _business.businessEmail,
        firstName: _business.businessName,
        lastName: "SUPER ADMIN",
        phone: _business.phone,
      } as IBusinessAdmins,
      _business._id.toString()
    );

    return _business;
  }

  /**
   *
   * @param businessId
   * @param business
   * @returns
   */
  async UpdateBusiness(businessId: string, business: IBusiness) {
    const _business = await this.BusinessRepository.update(
      { _id: businessId },
      business
    );
    if (!_business)
      throw new ApiError(httpStatus.NOT_FOUND, "Business does not exist");

    return _business;
  }

  /**
   *
   * @param offset
   * @param limit
   * @param filters
   * @returns
   */
  async GetBusinesses(offset: number = 1, limit: number = 10, filters: any) {
    const businesses = await this.BusinessRepository.findAll(
      offset,
      limit,
      filters
    );
    return {
      businesses: businesses.data,
      totalCount: businesses.totalCount,
    };
  }

  /**
   *
   * @param businessId
   * @returns
   */
  async GetBusinessById(businessId: string) {
    const _business = await this.BusinessRepository.findById(businessId);
    if (!_business)
      throw new ApiError(httpStatus.NOT_FOUND, "Business does not exist");

    return _business;
  }

  /**
   *
   * @param businessId
   * @returns
   */
  async DeleteBusiness(businessId: string) {
    let _business = await this.BusinessRepository.findById(businessId);
    if (!_business)
      throw new ApiError(httpStatus.NOT_FOUND, "Business does not exist");

    await this.BusinessRepository.delete(businessId);
    return;
  }
}
