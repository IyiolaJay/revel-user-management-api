import httpStatus from "http-status";
import {
  IBusinessAdminRepository,
  IBusinessAdmins,
  IBusinessRepository,
} from "../../../interfaces/business.interface";
import ApiError from "../../../utilities/error.base";
import { EmailType } from "../../../utilities/enums/enum";
import EmailService from "../../../email/emailer";
import { generateRandomPassword } from "../../../helpers/password";
import SecurityHelperService from "../../../helpers/security";
import Encryptor from "../../../utilities/encryptor";
import config from "config"

export default class BusinessManagementService {
  private BusinessRepository: IBusinessRepository;
  private BusinessAdminRepository: IBusinessAdminRepository;
  private emailService = new EmailService();
  private securityHelperService: SecurityHelperService =
    new SecurityHelperService();
  private encryptor: Encryptor = new Encryptor();

  constructor(
    businessRepository: IBusinessRepository,
    businessAdminRepository: IBusinessAdminRepository
  ) {
    this.BusinessRepository = businessRepository;
    this.BusinessAdminRepository = businessAdminRepository;
  }

  /**
   *
   * @param adminDetails
   * @param businessId
   * @returns
   */
  async CreateBusinessAdmin(adminDetails: IBusinessAdmins, businessId: string) {
    let businessAdmin = await this.BusinessAdminRepository.findOneByFilter({
      email: { $regex: new RegExp(`^${adminDetails.email}$`, "i") },
      businessId: businessId,
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
      password: await this.securityHelperService.HashPassword(genPassword),
    });

    const temporaryToken = await this.securityHelperService.GenerateJWT({
      accountType: "business",
      id: businessAdmin._id.toString(),
      role: "business",
      metaData: { businessId: businessId },
      permissions : []
    },
    "1h"
  )

    this.emailService.SendEMailToUser(
      {
        to: businessAdmin.email,
        bodyParts: {
          name: businessAdmin.firstName,
          email: businessAdmin.email,
          password: genPassword,
          _id: businessAdmin._id,
          changePasswordUrl : `${config.get("CLIENT_URL")}?id=${businessAdmin._id}&token=${temporaryToken}`
        },
      },
      EmailType.CredentialsEmail
    );

    return businessAdmin;
  }
  
  async AddTapPaymentsCredentials(key: string, businessId: string) {
    const encrypted = this.encryptor.encrypt(key);

    await this.BusinessRepository.update(
      {
        _id: businessId,
      },
      {
        tapEncryptedKeys: {
          key: encrypted.key,
          iv: encrypted.iv,
        },
      }
    );
    return;
  }
}
