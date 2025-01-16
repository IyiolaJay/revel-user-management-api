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

export default class UserAuthService {
  private AdminRepository: IAdminRepository;
  private securityHelperService: SecurityHelperService =
    new SecurityHelperService();
  private otpRepository: IOtpRepository;
  private emailService = new EmailService();
  private ClientRepository: IClientRepository;

  constructor(
    adminRepository: IAdminRepository,
    clientRepository: IClientRepository
  ) {
    this.AdminRepository = adminRepository;
    this.otpRepository = new OtpRepository();
    this.ClientRepository = clientRepository;
  }

  /**
   *
   * @param admin
   * @returns
   */
  async LoginAdminAccount(
    admin: Partial<IAdmin>,
    deviceInfo: Partial<IDevice>
  ) {
    const adminData = await this.AdminRepository.findOneByFilter({
      email: { $regex: new RegExp(`^${admin.email}$`, "i") },
    });

    if (!adminData)
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid login details...");

    //check password
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

    //response data structure to be sent to the client
    const tokenResponse = {
      accessToken: await this.securityHelperService.GenerateJWT(
        {
          id: adminData._id.toString(),
          role: adminData.adminType,
          permissions: mapPermissionKeysToValues(adminData.permissionSet),
          accountType: "admin",
        },
        "15m"
      ),
      message: "Verify OTP to complete login, OTP sent to user's email",
      rememberDevice: false,
    };

    //
    //check if remember device is set
    if (
      adminData.device &&
      deviceInfo.userAgent === adminData.device.userAgent &&
      adminData.device.rememberMeExpires > new Date()
    ) {
      return {
        ...tokenResponse,
        accessToken: await this.securityHelperService.GenerateJWT(
          {
            id: adminData._id.toString(),
            role: adminData.adminType,
            permissions: mapPermissionKeysToValues(adminData.permissionSet),
            accountType: "admin",
          },
          "24h"
        ),
        message: "Login succesful",
        rememberDevice: true,
      };
    }

    // if login is from a different device
    // token is sent to user emails
    const token = await this.otpRepository.create({
      ownerId: adminData._id.toString(),
      otpToken: this.securityHelperService.generateOtp(),
    });

    this.emailService.SendEMailToUser(
      {
        to: adminData.email,
        bodyParts: {
          otp: token.otpToken,
        },
      },
      EmailType.VerifyEmail
    );
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
    if (rememberDevice && owner.accountType === "client") {
      // const user = await this.ClientRepository.findOneByFilter({
      //   clientId: owner.id,
      // });

      await this.ClientRepository.update({clientId: owner.id}, {
        device: {
          rememberMeExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // remember device for 30 days
          ipAddress: deviceInfo.ipAddress as string,
          userAgent: deviceInfo.userAgent as string,
        },
      });
    }
    //
    if (rememberDevice && owner.accountType === "admin") {
      // const user = await this.AdminRepository.findOneByFilter({
      //   adminId: owner.id,
      // });

      // console.log(user);
      await this.AdminRepository.update({adminId : owner.id}, {
        device: {
          rememberMeExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // remember device for 30 days
          ipAddress: deviceInfo.ipAddress as string,
          userAgent: deviceInfo.userAgent as string,
        },
      });
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
    } else {
      user = await this.ClientRepository.findOneByFilter({
        clientId: id,
      });
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
      await this.AdminRepository.update({_id : user._id}, {
        password: await this.securityHelperService.HashPassword(password),
        hasSetPassword: true,
      });
    else
      await this.ClientRepository.update({_id : user._id}, {
        password: await this.securityHelperService.HashPassword(password),
        hasSetPassword: true,
      });
  }

  /**
   *
   * @param client
   * @returns
   */
  async LoginClientAccount(
    client: Partial<IClient>,
    deviceInfo: Partial<IDevice>
  ) {
    const clientData = await this.ClientRepository.findOneByFilter({
      email: { $regex: new RegExp(`^${client.email}$`, "i") },
    });

    if (!clientData)
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid login details...");

    //check password
    if (
      !(await this.securityHelperService.ComparePassword(
        client.password!,
        clientData.password
      ))
    ) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Incorrect email or password..."
      );
    }

    //response data structure to be sent to the client
    const tokenResponse =  {
      accessToken: await this.securityHelperService.GenerateJWT(
        {
          id: clientData._id.toString(),
          role: clientData.clientType,
          permissions: clientData.permissionSet,
          accountType: "client",
        },
        "15m"
      ),
      message: "Verify OTP to complete login, OTP sent to user's email",
      rememberDevice : false,
    };

    //check if remember device was set
    if (
      deviceInfo.userAgent === clientData.device.userAgent &&
      clientData.device.rememberMeExpires > new Date()
    ) {
      return {
        ...tokenResponse,
        accessToken: await this.securityHelperService.GenerateJWT(
          {
            id: clientData._id.toString(),
            role: clientData.clientType,
            permissions: clientData.permissionSet,
            accountType: "client",
          },
          "24h"
        ),
        message : "Login Successful",
        rememberDevice : true,
        
      }
    }

    // if login is from a different device
    // token is sent to user emails
    const token = await this.otpRepository.create({
      ownerId: clientData._id.toString(),
      otpToken: this.securityHelperService.generateOtp(),
    });

    this.emailService.SendEMailToUser(
      {
        to: clientData.email,
        bodyParts: {
          otp: token.otpToken,
        },
      },
      EmailType.VerifyEmail
    );

    return tokenResponse;
  }
}
