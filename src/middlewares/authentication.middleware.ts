import httpStatus from "http-status";
import SecurityService from "../helpers/security";
import { NextFunction, Request, Response } from "express";
import ApiError from "../utilities/error.base";
import { ITokenData } from "../interfaces/token.interface";
import Client from "../database/models/client.model";
import Admin from "../database/models/admin.model";

class AuthenticationMiddleware {
  private securityService: SecurityService;

  constructor() {
    this.securityService = new SecurityService();
  }

  //Bearer token splitter
  static getTokenFromHeader(req: Request) {
    const authHeader = req.headers["authorization"] ?? null;
    if (!authHeader || authHeader.split(" ")[0] !== "Bearer")
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Authentication token is required"
      );
    return authHeader.split(" ")[1];
  }

  //
  static getTokenFromHeaderWithNoException(req: Request) {
    const authHeader = req.headers["authorization"] ?? null;
    let token: string | undefined;
    if (!authHeader || authHeader.split(" ")[0] !== "Bearer") token = undefined;
    else token = authHeader.split(" ")[1] as string;
    return token;
  }

  //
  public AuthorizeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = AuthenticationMiddleware.getTokenFromHeader(req);
      const decodedToken: ITokenData =
        (await this.securityService.VerifyAuthToken(
          token as string
        )) as ITokenData;

      if (!decodedToken)
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid or expired token");

      res.locals.user = {
        ...decodedToken,
      };

      next();
    } catch (error) {
      next(error);
    }
  };

  public async GetAccountType(req: Request, _: Response, next: NextFunction) {
   try{


    const { email } = req.body;

    if (
      await Client.findOne({
        email: { $regex: new RegExp(`^${email}$`, "i") },
      })
    ) {
      req.body.loginType = "client";
    } else if (
      await Admin.findOne({
        email: { $regex: new RegExp(`^${email}$`, "i") },
      })
    ) {
      req.body.loginType = "admin";
    } else {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Account does not exist"
      )
    }
    next();
   }catch(error : any){
    next(error);

   }
  }
}

export default AuthenticationMiddleware;
