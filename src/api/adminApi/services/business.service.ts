import httpStatus from "http-status";
import { IBusiness, IBusinessAdminRepository, IBusinessAdmins, IBusinessRepository } from "../../../interfaces/business.interface";
import ApiError from "../../../utilities/error.base";
import { EmailType } from "../../../utilities/enums/enum";
import EmailService from "../../../email/emailer";
import { generateRandomPassword } from "../../../helpers/password";
import SecurityHelperService from "../../../helpers/security";



export default class BusinessService {
    private BusinessRepository: IBusinessRepository;
    private BusinessAdminRepository : IBusinessAdminRepository;
    private emailService = new EmailService();
    private securityHelperService: SecurityHelperService =
        new SecurityHelperService();


    constructor(businessRepository: IBusinessRepository, businessAdminRepository : IBusinessAdminRepository) {
        this.BusinessRepository = businessRepository;
        this.BusinessAdminRepository = businessAdminRepository;
    }


    /**
     * 
     * @param business 
     * @param adminId (system administrator)
     * @returns 
     */
    async CreateBusiness(business: IBusiness, adminId : string) {
        let _business = await this.BusinessRepository.findOneByFilter({
            businessName: { $regex: new RegExp(`^${business.businessName}$`, "i") },
        });

        if (_business)
            throw new ApiError(httpStatus.CONFLICT, "Business already exists");

        _business = await this.BusinessRepository.create({
            ...business,
            createdBy : adminId as any
        });


        await this.CreateBusinessAdmin(
            {
                adminType : "BUSINESS_SUPER_ADMIN", // change later
                businessId : _business._id,
                email : _business.businessEmail,
                firstName : _business.businessName,
                lastName : "SUPER ADMIN",
                phone : _business.phone,    
            } as IBusinessAdmins,
            _business._id.toString()
        )

        return _business;
    }

    /**
     * 
     * @param businessId 
     * @param business 
     * @returns 
     */
    async UpdateBusiness(businessId: string, business: IBusiness) {
        const _business = await this.BusinessRepository.update({ _id: businessId }, business);
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
        const businesses = await this.BusinessRepository.findAll(offset, limit, filters);
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
        let _business = await this.BusinessRepository.findById(businessId)
        if (!_business)
            throw new ApiError(httpStatus.NOT_FOUND, "Business does not exist");
        
        await this.BusinessRepository.delete(businessId);
        return;
    }

    /**
     * 
     * @param adminDetails 
     * @param businessId 
     * @returns 
     */
    async CreateBusinessAdmin(adminDetails : IBusinessAdmins, businessId : string){
        let businessAdmin = await this.BusinessAdminRepository.findOneByFilter({
            email: { $regex: new RegExp(`^${adminDetails.email}$`, "i") },
            businessId : businessId
        });

        if (businessAdmin)
            throw new ApiError(httpStatus.CONFLICT, "Business admin already exists");

        const _business = await this.BusinessRepository.findById(businessId);
        if (!_business)
            throw new ApiError(httpStatus.NOT_FOUND, "Business does not exist");


        const genPassword = generateRandomPassword();

        businessAdmin = await this.BusinessAdminRepository.create({
            ...adminDetails,
            businessId: businessId as any,
            password : await this.securityHelperService.HashPassword(genPassword),
        })

         this.emailService.SendEMailToUser(
              {
                to: businessAdmin.email,
                bodyParts: {
                  name: businessAdmin.firstName,
                  email: businessAdmin.email,
                  password : genPassword,
                  _id: businessAdmin._id,
                },
              },
              EmailType.CredentialsEmail
            );

        return businessAdmin;

    }
}