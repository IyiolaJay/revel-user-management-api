// import httpStatus from "http-status";
// import ApiError from "../../../utilities/error.base";
// import { IClientRepository } from "../../../interfaces/client.interface";

// export default class ClientProfileService{
//     private ClientRepository : IClientRepository;

//     constructor(clientRepository: IClientRepository){
//         this.ClientRepository = clientRepository;
//     }

//     /**
//      * 
//      * @param id 
//      * @returns 
//      */
//     async GetProfile(id : string){
//         const user = await this.ClientRepository.findOneByFilter({
//             clientId : id
//         });

//         if(!user) throw new ApiError(
//             httpStatus.NOT_FOUND,
//             "Unable to fetch profile, user not found"
//         );

//         return user;
//     }

// }