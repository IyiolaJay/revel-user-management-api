import httpStatus from "http-status";
import { IAdmin, IAdminRepository } from "../../../interfaces/admin.interface";
import ApiError from "../../../utilities/error.base";
import SecurityHelperService from "../../../helpers/security";
import {
  IDevice,
  IOtpRepository,
  ITokenData,
} from "../../../interfaces/token.interface";
import OtpRepository from "../../../repositories/otp.repository";
// import { generateRandomPassword } from "../../../helpers/password";
import EmailService from "../../../email/emailer";
import { EmailType } from "../../../utilities/enums/enum";
import {
  IClient,
  IClientRepository,
} from "../../../interfaces/client.interface";
import { mapPermissionKeysToValues } from "../../../helpers/permissions.mapper";
import {
  IBusinessAdmins,
  IBusinessAdminRepository,
} from "../../../interfaces/business.interface";
import { mapAdminTypeKeyToValue } from "../../../helpers/role.mapper";

export default class UserAuthService {
  private AdminRepository: IAdminRepository;
  private securityHelperService: SecurityHelperService =
    new SecurityHelperService();
  private otpRepository: IOtpRepository;
  private emailService = new EmailService();
  private ClientRepository: IClientRepository;
  private BusinessAdminRepository: IBusinessAdminRepository;

  constructor(
    adminRepository: IAdminRepository,
    clientRepository: IClientRepository,
    businessAdminRepository: IBusinessAdminRepository
  ) {
    this.AdminRepository = adminRepository;
    this.otpRepository = new OtpRepository();
    this.ClientRepository = clientRepository;
    this.BusinessAdminRepository = businessAdminRepository;
  }

  /**
   *
   * @param email
   * @param accountType
   * @returns
   */
  private async getUserDataByEmail(
    email: string,
    accountType: "admin" | "client" | "business"
  ) {
    const repository =
      accountType === "admin"
        ? this.AdminRepository
        : accountType === "client"
        ? this.ClientRepository
        : this.BusinessAdminRepository;

    return await repository.findOneByFilter({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });
  }

  /**
   * 
   * @param userData 
   * @param accountType 
   * @param duration 
   * @param message 
   * @returns 
   */
  private async generateTokenResponse(
    userData:  IAdmin | IClient | IBusinessAdmins,
    accountType: "admin" | "client" | "business",
    duration: string,
    rememberDevice : boolean = false,
    message?: string,
  ) {
    let tokenData : ITokenData = {
      id: userData._id.toString(),
      role:
        accountType === "client"
          ? "CLIENT"
          : mapAdminTypeKeyToValue((userData as IAdmin | IBusinessAdmins).adminType)!,
      permissions: mapPermissionKeysToValues(userData.permissionSet),
      accountType: accountType,
    }


    if((userData as IBusinessAdmins).businessId) tokenData = {
      ...tokenData,
      metaData : {
        businessId : (userData as IBusinessAdmins).businessId
      }
    }

    return {
      accessToken: await this.securityHelperService.GenerateJWT(
        tokenData,
        duration
      ),
      message:
        message ?? "Verify OTP to complete login, OTP sent to user's email",
      rememberDevice,
      accountType : accountType
    };
  }

  /**
   * 
   * @param userData 
   */
  private async sendOtpToUser(userData: IAdmin | IClient | IBusinessAdmins) {
    const token = await this.otpRepository.create({
      ownerId: userData._id.toString(),
      otpToken: this.securityHelperService.generateOtp(),
    });

    this.emailService.SendEMailToUser(
      {
        to: userData.email,
        bodyParts: {
          otp: token.otpToken,
        },
      },
      EmailType.VerifyEmail
    );
  }

  /**
   *
   * @param user
   * @param deviceInfo
   * @param accountType
   * @returns
   */
  async LoginAccount(
    user: Partial<IAdmin | IClient | IBusinessAdmins>,
    deviceInfo: Partial<IDevice>,
    accountType: "admin" | "client" | "business"
  ) {
    const userData = await this.getUserDataByEmail(user.email!, accountType);

    if (!userData)
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid login details...");

    //check password
    if (
      !(await this.securityHelperService.ComparePassword(
        user.password!,
        userData.password
      ))
    ) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Incorrect email or password..."
      );
    }

    //response data structure to be sent to the client
    let tokenResponse;
    //check if remember device is set
    console.log(accountType);
    if (
      userData.device &&
      deviceInfo.userAgent === userData.device.userAgent &&
      userData.device.rememberMeExpires > new Date()
    ) {
      tokenResponse = await this.generateTokenResponse(
        userData,
        accountType,
        "24h",
        true,
        "Login Successful",
        //  (userData as IBusinessAdmins).businessId.toString() ?? undefined
      );

    } else{ 
      //  if device is not saved... verify otp
      tokenResponse = await this.generateTokenResponse(
      userData,
      accountType,
      "15m",
      // (userData as IBusinessAdmins).businessId.toString() ?? undefined
    );  
  }

    // if login is from a different device
    // token is sent to user emails
    await this.sendOtpToUser(userData);

    return tokenResponse;
  }

  /**
   *
   * @param token
   * @param owner
   * @returns
   */
  async VerifyToken(
    token: string,
    owner: ITokenData,
    rememberDevice: boolean = false,
    deviceInfo: IDevice
  ) {
    const isValidToken = await this.otpRepository.findOneByFilter({
      otpToken: token,
      ownerId: owner.id,
    });

    if (!isValidToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid or Expired Token");
    }

    this.otpRepository.delete(isValidToken._id!.toString());

    //
    // if remember device is set to true
    if (rememberDevice) {
      const repository =
      owner.accountType === "client"
        ? this.ClientRepository
        : owner.accountType === "admin"
        ? this.AdminRepository
        : this.BusinessAdminRepository;

      await repository.update(
      { _id: owner.id },
      {
        device: {
        rememberMeExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // remember device for 30 days
        ipAddress: deviceInfo.ipAddress as string,
        userAgent: deviceInfo.userAgent as string,
        },
      }
      );
    }
    
    return {
      accessToken: await this.securityHelperService.GenerateJWT(
        {
          id: owner.id.toString(),
          role: owner.role,
          permissions: owner.permissions,
          accountType: owner.accountType,
        },
        "24h"
      ),
      accessTokenExpiration: 24,
      accountType: owner.accountType, 
    };
  }

  /**
   *
   * @param id
   * @param password
   */
  async ChangePassword(id: string, password: string, path: string) {
    let user;

    if (path === "admin") {
      user = await this.AdminRepository.findOneByFilter({
        adminId: id,
      });
    } else if (path === "client") {
      user = await this.ClientRepository.findOneByFilter({
        clientId: id,
      });
    }else {
      user = await this.BusinessAdminRepository.findOneByFilter({
        businessId : id,
      })
    }

    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

    if (
      await this.securityHelperService.ComparePassword(password, user.password)
    ) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        "Use a different password that's not your old password"
      );
    }

    if (path === "admin")
      await this.AdminRepository.update(
        { _id: user._id },
        {
          password: await this.securityHelperService.HashPassword(password),
          hasSetPassword: true,
        }
      );
    else
      await this.ClientRepository.update(
        { _id: user._id },
        {
          password: await this.securityHelperService.HashPassword(password),
          hasSetPassword: true,
        }
      );
  }

  // async LoginAdminAcount
}
