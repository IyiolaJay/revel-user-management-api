import GenericRepository from "./generic.repository";
import { IOtp, IOtpRepository } from "../interfaces/token.interface";
import OTP from "../database/models/otp.model";


export default class OtpRepository extends GenericRepository<IOtp> implements IOtpRepository{
    constructor(){
        super(OTP);
    }
}