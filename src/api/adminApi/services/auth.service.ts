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
import {
  IClient,
  IClientRepository,
} from "../../../interfaces/client.interface";
import { mapPermisionValuesToKeys } from "../../../helpers/permissions.mapper";
import {
  IActiveService,
  IServiceRepository,
} from "../../../interfaces/service.interface";
import { cacheData, getCacheData } from "../../../redis/redis.cache";

export default class AdminAuthService {
  private AdminRepository: IAdminRepository;
  private ServiceRepository: IServiceRepository;
  private securityHelperService: SecurityHelperService =
    new SecurityHelperService();
  // private otpRepository: IOtpRepository;
  private emailService = new EmailService();
  private ClientRepository: IClientRepository;

  constructor(
    adminRepository: IAdminRepository,
    clientRepository: IClientRepository,
    serviceRepository: IServiceRepository
  ) {
    this.AdminRepository = adminRepository;
    this.ServiceRepository = serviceRepository;
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

  /**
   *
   * @param client
   * @returns
   */
  async CreateClientAccount(
    client: IClient,
    creatorId: string,
    defaultService?: Partial<IActiveService>
  ) {
    let _client = await this.ClientRepository.findOneByFilter({
      email: { $regex: new RegExp(`^${client.email}$`, "i") },
    });

    if (_client) {
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
        to: _client.email,
        bodyParts: {
          name: _client.name,
          email: _client.email,
          password: genPassword,
          _id: _client._id,
        },
      },
      EmailType.CredentialsEmail
    );

    if (defaultService) {
      await this.ServiceRepository.createActiveService({
        clientId: _client.clientId,
        serviceId: defaultService.serviceId as string,
        expireDate: defaultService.expireDate as Date,
      });

      const cachedEstablishment = JSON.parse(
        (await getCacheData("acs_01")) ?? "[]"
      );

      //caching data for realtime middleware service
      // this block will add the new user establishment IDs for 
      await cacheData({
        key: "acs_01",
        value: JSON.stringify([
          ...cachedEstablishment,
          ...client.establishmentId,
        ]),
      });
    }

    return;
  }
}
