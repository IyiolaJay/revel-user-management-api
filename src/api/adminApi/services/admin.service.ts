import httpStatus from "http-status";
import { IAdmin, IAdminRepository } from "../../../interfaces/admin.interface";
import ApiError from "../../../utilities/error.base";
import SecurityHelperService from "../../../helpers/security";
import { generateRandomPassword } from "../../../helpers/password";
import EmailService from "../../../email/emailer";
import { EmailType } from "../../../utilities/enums/enum";
import { mapPermisionValuesToKeys } from "../../../helpers/permissions.mapper";

export default class AdminAuthService {
  private AdminRepository: IAdminRepository;
  private securityHelperService: SecurityHelperService =
    new SecurityHelperService();
  private emailService = new EmailService();

  constructor(
    adminRepository: IAdminRepository,
  ) {
    this.AdminRepository = adminRepository;
  }

  /**
   *
   * @param admin
   * @returns
   */
  async CreateAdminAccount(admin: IAdmin) {
    let _admin = await this.AdminRepository.findOneByFilter({
      email: { $regex: new RegExp(`^${admin.email}$`, "i") },
    });

    if (_admin)
      throw new ApiError(
        httpStatus.CONFLICT,
        "Admin account exists with this email"
      );

    admin.permissionSet = mapPermisionValuesToKeys(admin.permissionSet);

    const genPassword = generateRandomPassword();

    _admin = await this.AdminRepository.create({
      ...admin,
      password: await this.securityHelperService.HashPassword(genPassword),
    });
    
    //send credentials to admin mail
    this.emailService.SendEMailToUser(
      {
        to: admin.email,
        bodyParts: {
          name: _admin.name,
          email: _admin.email,
          password: genPassword,
          _id: _admin._id,
        },
      },
      EmailType.CredentialsEmail
    );

    return;
  }

 

  async UpdateAdminAccount(adminId : string, updateData : Partial<IAdmin>){
    const admin = await this.AdminRepository.update({_id : adminId}, updateData);
    if(!admin) throw new ApiError(
      httpStatus.NOT_FOUND,
      "Admin account not found"
    )
     return admin;
  }

  async GetAllAdmins(
    offset: number = 1,
    limit: number = 20,
    filters : any,
  ){
    return await this.AdminRepository.findAll(offset,limit,filters)
  }
}
