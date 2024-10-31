import httpStatus from "http-status";
import { IAdmin, IAdminRepository } from "../../../interfaces/admin.interface";
import ApiError from "../../../utilities/error.base";
import SecurityHelperService from "../../../helpers/security";
import {
  IOtpRepository,
  ITokenData,
} from "../../../interfaces/token.interface";
import OtpRepository from "../../../repositories/otp.repository";
import { generateRandomPassword } from "../../../helpers/password";
import EmailService from "../../../email/emailer";
import { EmailType } from "../../../utilities/enums/enum";
import { IClient, IClientRepository } from "../../../interfaces/client.interface";
import { mapPermisionValuesToKeys } from "../../../helpers/permissions.mapper";

export default class AdminAuthService {
  private AdminRepository: IAdminRepository;
  private securityHelperService: SecurityHelperService = new SecurityHelperService();
  private otpRepository: IOtpRepository;
  private emailService = new EmailService();
  private ClientRepository: IClientRepository;


  constructor(adminRepository: IAdminRepository, clientRepository: IClientRepository) {
    this.AdminRepository = adminRepository;
    this.otpRepository = new OtpRepository();
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
   * @param admin 
   * @returns 
   */
  async LoginAdminAccount(admin: Partial<IAdmin>) {
    const adminData = await this.AdminRepository.findOneByFilter({
      email: { $regex: new RegExp(`^${admin.email}$`, "i") },
    });

    if (!adminData)
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid login details...");


    //check if password is system generated
    if(adminData.isGeneratedPassword === true){
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        "You are using a system generated password, please change your password. Thanks",
      )
    }
    
    //
    if (
      !(await this.securityHelperService.ComparePassword(
        admin.password!,
        adminData.password
      ))
    )
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Incorrect email or password..."
      );

    const token = await this.otpRepository.create({
      ownerId: adminData.adminId,
      otpToken: this.securityHelperService.generateOtp(),
    });

    this.emailService.SendEMailToUser(
      {
        to : adminData.email,
        bodyParts : {
          otp : token.otpToken
        }
      },
      EmailType.VerifyEmail
    )

    return {
      accessToken: await this.securityHelperService.GenerateJWT(
        {
          id: adminData.adminId.toString(),
          role: adminData.adminType,
          permissions: adminData.permissionSet,
        },
        "15m"
      ),
    };
  }

  /**
   * 
   * @param token 
   * @param owner 
   * @returns 
   */
  async VerifyToken(token: string, owner: ITokenData) {
    const isValidToken = await this.otpRepository.findOneByFilter({
      otpToken: token,
      ownerId: owner.id,
    });

    if (!isValidToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid or Expired Token");
    }

    this.otpRepository.delete(isValidToken._id!.toString());
    return {
      accessToken: await this.securityHelperService.GenerateJWT(
        {
          id: owner.id.toString(),
          role: owner.role,
          permissions: owner.permissions,
        },
        "24h"
      ),
    };
  }

  /**
   * 
   * @param id 
   * @param password 
   */
  async ChangePassword(id : string, password : string){
    const user = await this.AdminRepository.findById(id);

    if(!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

    if(await this.securityHelperService.ComparePassword(password, user.password)) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        "Use a different password that's not your old password"
      )
    }

    await this.AdminRepository.update(id, {
      password : await this.securityHelperService.HashPassword(password),
      isGeneratedPassword : false,
    });
  }

  /**
   * 
   * @param client 
   * @returns 
   */
  async CreateClientAccount(client: IClient) {
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


