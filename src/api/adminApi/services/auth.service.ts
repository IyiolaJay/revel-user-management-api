import httpStatus from "http-status";
import { IAdmin, IAdminRepository } from "../../../interfaces/admin.interface";
import ApiError from "../../../utilities/error.base";
import SecurityHelperService from "../../../helpers/security";
// import {
//   IOtpRepository,
//   // ITokenData,
// } from "../../../interfaces/token.interface";
// import OtpRepository from "../../../repositories/otp.repository";
import { generateRandomPassword } from "../../../helpers/password";
import EmailService from "../../../email/emailer";
import { EmailType } from "../../../utilities/enums/enum";
import { IClient, IClientRepository } from "../../../interfaces/client.interface";
import { mapPermisionValuesToKeys } from "../../../helpers/permissions.mapper";

export default class AdminAuthService {
  private AdminRepository: IAdminRepository;
  private securityHelperService: SecurityHelperService = new SecurityHelperService();
  // private otpRepository: IOtpRepository;
  private emailService = new EmailService();
  private ClientRepository: IClientRepository;


  constructor(adminRepository: IAdminRepository, clientRepository: IClientRepository) {
    this.AdminRepository = adminRepository;
    // this.otpRepository = new OtpRepository();
    this.ClientRepository = clientRepository;

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

      admin.permissionSet = mapPermisionValuesToKeys(admin.permissionSet)
    
      const genPassword = generateRandomPassword();

    _admin = await this.AdminRepository.create({
      ...admin,
      password: await this.securityHelperService.HashPassword(genPassword),
    });

    //send credentials to admin mail
    this.emailService.SendEMailToUser(
      {
        to : admin.email,
        bodyParts : {
          name : _admin.name,
          email : _admin.email,
          password : genPassword,
          _id : _admin._id
          },
      },
      EmailType.CredentialsEmail
    )

    return;
  }

  /**
   * 
   * @param client 
   * @returns 
   */
  async CreateClientAccount(client: IClient, creatorId : string) {
    let _client = await this.ClientRepository.findOneByFilter({
      email: { $regex: new RegExp(`^${client.email}$`, "i") },
    });

    if (_client){
      throw new ApiError(
        httpStatus.CONFLICT,
        "Client account exists with this email"
      );
    }

    const genPassword = generateRandomPassword();

    _client = await this.ClientRepository.create({
      ...client,
      creatorId,
      password: await this.securityHelperService.HashPassword(genPassword),
    });

    //send credentials to client mail
    this.emailService.SendEMailToUser(
      {
        to : _client.email,
        bodyParts : {
          name : _client.name,
          email : _client.email,
          password : genPassword,
          _id : _client._id
          },
      },
      EmailType.CredentialsEmail
    )

    return;
  }
}


