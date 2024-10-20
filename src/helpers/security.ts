import config from "config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ITokenData } from "../interfaces/token.interface";

export default class SecurityHelperService {
  private Bcrypt = bcrypt;
  private jwt_secret = config.get("JWT_SECRET") as string;

  //
  public async HashPassword(password: string): Promise<string> {
    try {
      const pwd = await this.Bcrypt.hash(password, 12);
      return pwd;
    } catch (error) {
      throw error;
    }
  }

  //
  public async ComparePassword(enteredPassword: string, password: string) {
    try {
      const isValid = await this.Bcrypt.compare(enteredPassword, password);
      return isValid;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //
  public async GenerateJWT(payload: ITokenData, duration: string) {
    return jwt.sign(payload, this.jwt_secret ?? "", {
      expiresIn: duration ?? "24h",
    });
  }

  //
  public async VerifyAuthToken(token: string) {
    try {
      const isValid = jwt.verify(token, this.jwt_secret ?? "") as ITokenData;
      return isValid;
    } catch (error) {
      console.log("JWT VERIFY ERROR", error);
      return null;
    }
  }

  public generateOtp(){
    const code = Math.floor(10000 + Math.random() * 90000); // 6-digit code
    return code.toString();
  }
}


