import httpStatus from "http-status";
import { IAdmin, IAdminRepository } from "../../../interfaces/admin.interface";
import ApiError from "../../../utilities/error.base";
import SecurityHelperService from "../../../helpers/security";
import {
  IOtpRepository,
  ITokenData,
} from "../../../interfaces/token.interface";
import OtpRepository from "../../../repositories/otp.repository";

export default class AdminService {
  private AdminRepository: IAdminRepository;
  private securityHelperService: SecurityHelperService =
    new SecurityHelperService();
  private otpRepository: IOtpRepository;

  constructor(adminRepository: IAdminRepository) {
    this.AdminRepository = adminRepository;
    this.otpRepository = new OtpRepository();
  }

  //
  async CreateAdminAccount(admin: IAdmin) {
    const checkAdmin = await this.AdminRepository.findOneByFilter({
      email: { $regex: new RegExp(`^${admin.email}$`, "i") },
    });

    if (checkAdmin)
      throw new ApiError(
        httpStatus.CONFLICT,
        "Admin account exists with this email"
      );

    await this.AdminRepository.create({
      ...admin,
      password: await this.securityHelperService.HashPassword(admin.password),
    });

    return;
  }

  //
  async LoginAdminAccount(admin: Partial<IAdmin>) {
    const adminData = await this.AdminRepository.findOneByFilter({
      email: { $regex: new RegExp(`^${admin.email}$`, "i") },
    });

    if (!adminData)
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid login details...");

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
    console.log(token);

    return {
      accessToken: await this.securityHelperService.GenerateJWT(
        {
          id: adminData.adminId.toString(),
          type: adminData.adminType,
          permissions: adminData.permissionSet,
        },
        "15m"
      ),
    };
  }

  //
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
          type: owner.type,
          permissions: owner.permissions,
        },
        "24h"
      ),
    };
  }
}
