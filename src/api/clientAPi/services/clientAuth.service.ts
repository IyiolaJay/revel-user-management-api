import httpStatus from "http-status";
import ApiError from "../../../utilities/error.base";
import SecurityHelperService from "../../../helpers/security";
import {
  IOtpRepository,
  ITokenData,
} from "../../../interfaces/token.interface";
import OtpRepository from "../../../repositories/otp.repository";
import { IClient, IClientRepository } from "../../../interfaces/client.interface";

export default class ClientAuthService {
  private ClientRepository: IClientRepository;
  private securityHelperService: SecurityHelperService =
    new SecurityHelperService();
  private otpRepository: IOtpRepository;

  constructor(clientRepository: IClientRepository) {
    this.ClientRepository = clientRepository;
    this.otpRepository = new OtpRepository();
  }

  //
  async CreateClientAccount(client: IClient) {
    const checkClient = await this.ClientRepository.findOneByFilter({
      email: { $regex: new RegExp(`^${client.email}$`, "i") },
    });

    if (checkClient)
      throw new ApiError(
        httpStatus.CONFLICT,
        "Client account exists with this email"
      );

    await this.ClientRepository.create({
      ...client,
      password: await this.securityHelperService.HashPassword(client.password),
    });

    return;
  }

  //
  async LoginClientAccount(client: Partial<IClient>) {
    const clientData = await this.ClientRepository.findOneByFilter({
      email: { $regex: new RegExp(`^${client.email}$`, "i") },
    });

    if (!clientData)
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid login details...");

    //
    if (
      !(await this.securityHelperService.ComparePassword(
        client.password!,
        clientData.password
      ))
    )
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Incorrect email or password..."
      );

    const token = await this.otpRepository.create({
      ownerId: clientData.establishmentId,
      otpToken: this.securityHelperService.generateOtp(),
    });
    console.log(token);

    return {
      accessToken: await this.securityHelperService.GenerateJWT(
        {
          id: clientData.establishmentId.toString(),
          type: clientData.clientType,
          permissions: clientData.permissionSet,
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
