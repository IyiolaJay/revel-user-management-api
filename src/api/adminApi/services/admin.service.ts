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

  /**
   *
   * @param client
   * @returns
   */
  // async CreateClientAccount(
  //   client: IClient,
  //   creatorId: string,
  //   subscribedService?: string[]
  // ) {
  //   let _client = await this.ClientRepository.findOneByFilter({
  //     email: { $regex: new RegExp(`^${client.email}$`, "i") },
  //   });

  //   if (_client) {
  //     throw new ApiError(
  //       httpStatus.CONFLICT,
  //       "Client account exists with this email"
  //     );
  //   }

  //   const genPassword = generateRandomPassword();

  //   _client = await this.ClientRepository.create({
  //     ...client,
  //     creatorId,
  //     password: await this.securityHelperService.HashPassword(genPassword),
  //   });

  //   //send credentials only client users, 
  //   // if(client.hasAccount){
  //   //   this.emailService.SendEMailToUser(
  //   //     {
  //   //       to: _client.email,
  //   //       bodyParts: {
  //   //         name: _client.name,
  //   //         email: _client.email,
  //   //         password: genPassword,
  //   //         _id: _client._id,
  //   //       },
  //   //     },
  //   //     EmailType.CredentialsEmail
  //   //   );
  //   // }
    

  //   if (subscribedService && subscribedService.length > 0) {
  //     const currentDate = new Date();
  //     currentDate.setMonth(currentDate.getMonth() + 6);

  //     const subscriptions = subscribedService.map((service) => ({
  //       serviceId: service,
  //       expireDate: currentDate,
  //     }));

  //     subscriptions.forEach(async (s) => {
  //       await this.ServiceRepository.createActiveService({
  //         clientId: _client._id.toString(),
  //         serviceId: s.serviceId as string,
  //         expireDate: s.expireDate as Date,
  //       });
  //     });
  //     // await this.ServiceRepository.createActiveService({
  //     //   clientId: _client.clientId,
  //     //   serviceId: defaultService.serviceId as string,
  //     //   expireDate: defaultService.expireDate as Date,
  //     // });

  //     const cachedEstablishment = JSON.parse(
  //       (await getCacheData("acs_01")) ?? "[]"
  //     );

  //     //caching data for realtime middleware service
  //     // this block will add the new user establishment IDs for
  //     await cacheData({
  //       key: "acs_01",
  //       value: JSON.stringify([
  //         ...cachedEstablishment,
  //         ...client.establishmentId.map((item) => ({
  //           estId: item,
  //           estUrl: client.establishmentUrl,
  //           clientId: _client._id.toString(),
  //         })),
  //       ]),
  //     });
  //   }

  //   return;
  // }

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
