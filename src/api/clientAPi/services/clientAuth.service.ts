// import httpStatus from "http-status";
// import ApiError from "../../../utilities/error.base";
// import SecurityHelperService from "../../../helpers/security";
// import {
//   IOtpRepository,
//   ITokenData,
// } from "../../../interfaces/token.interface";
// import OtpRepository from "../../../repositories/otp.repository";
// import { IClient, IClientRepository } from "../../../interfaces/client.interface";
// import EmailService from "../../../email/emailer";
// import { EmailType } from "../../../utilities/enums/enum";

// export default class ClientAuthService {
//   private ClientRepository: IClientRepository;
//   private securityHelperService: SecurityHelperService =
//     new SecurityHelperService();
//   private otpRepository: IOtpRepository;
//   private emailService = new EmailService();


//   constructor(clientRepository: IClientRepository) {
//     this.ClientRepository = clientRepository;
//     this.otpRepository = new OtpRepository();
    
//   }


//   /**
//    * 
//    * @param client 
//    * @returns 
//    */
//   async LoginClientAccount(client: Partial<IClient>) {
//     const clientData = await this.ClientRepository.findOneByFilter({
//       email: { $regex: new RegExp(`^${client.email}$`, "i") },
//     });

//     if (!clientData)
//       throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid login details...");

//         //check if password is system generated
//     if(clientData.isGeneratedPassword === true){
//           throw new ApiError(
//             httpStatus.NOT_ACCEPTABLE,
//             "You are using a system generated password, please change your password. Thanks"
//           )
//         }
//     //
//     if (
//       !(await this.securityHelperService.ComparePassword(
//         client.password!,
//         clientData.password
//       ))
//     )
//       throw new ApiError(
//         httpStatus.UNAUTHORIZED,
//         "Incorrect email or password..."
//       );

//     const token = await this.otpRepository.create({
//       ownerId: clientData.clientId,
//       otpToken: this.securityHelperService.generateOtp(),
//     });

//     this.emailService.SendEMailToUser(
//       {
//         to : clientData.email,
//         bodyParts : {
//           otp : token.otpToken
//         }
//       },
//       EmailType.VerifyEmail
//     )

//     return {
//       accessToken: await this.securityHelperService.GenerateJWT(
//         {
//           id: clientData.clientId.toString(),
//           role: clientData.clientType,
//           permissions: clientData.permissionSet,
//         },
//         "15m"
//       ),
//     };
//   }

//   /**
//    * 
//    * @param token 
//    * @param owner 
//    * @returns 
//    */
//   async VerifyToken(token: string, owner: ITokenData) {
//     const isValidToken = await this.otpRepository.findOneByFilter({
//       otpToken: token,
//       ownerId: owner.id,
//     });

//     if (!isValidToken) {
//       throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid or Expired Token");
//     }

//     this.otpRepository.delete(isValidToken._id!.toString());
//     return {
//       accessToken: await this.securityHelperService.GenerateJWT(
//         {
//           id: owner.id.toString(),
//           role: owner.role,
//           permissions: owner.permissions,
//         },
//         "24h"
//       ),
//     };
//   }

//   async ChangePassword(id : string, password : string){
//     const user = await this.ClientRepository.findById(id);

//     if(!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

//     if(await this.securityHelperService.ComparePassword(password, user.password)) {
//       throw new ApiError(
//         httpStatus.NOT_ACCEPTABLE,
//         "Use a different password that's not your old password"
//       )
//     }

//     await this.ClientRepository.update(id, {
//       password : await this.securityHelperService.HashPassword(password),
//       isGeneratedPassword : false,
//     });
//   }
// }
