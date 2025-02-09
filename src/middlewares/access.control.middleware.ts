import { Request, Response, NextFunction } from "express";
import { AdminType } from "../utilities/enums/enum";
import { ITokenData } from "../interfaces/token.interface";
import ApiError from "../utilities/error.base";
import httpStatus from "http-status";

export default class AccessControl {
  /**
   * Middleware to restrict access based on AdminType.
   * @param allowedTypes - Array of allowed AdminTypes.
   * @param allowSuperAdmin - Boolean to allow SUPER_ADMIN by default, default is true.
   * @returns Middleware function.
   */
  public static restrictTo = (allowedTypes: AdminType[], allowSuperAdmin: boolean = true) => (_: Request, res: Response, next: NextFunction) => {
    const user: ITokenData = res.locals.user;

    if (!user || (!allowedTypes.includes(user.role as AdminType) && !(allowSuperAdmin && user.role === AdminType.SUPER_ADMIN))) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "You do not have the required access to complete this action"
      );
    }

    next();
  };
}
