import { NextFunction,Response, Request } from "express";
import { Permissions } from "../utilities/enums/permissions.enum";
import { ITokenData } from "../interfaces/token.interface";
import ApiError from "../utilities/error.base";
import httpStatus from "http-status";

export default class PermissionValidation {


  /**
   * Checks if a user has the required permissions.
   * @param userPermissions - Array of user's permissions (enum keys).
   * @param requiredPermissions - Array of required permissions (enum keys).
   * @returns boolean - true if the user has all the required permissions, false otherwise.
   */
  private static checkUserPermission(
    requiredPermission: Permissions[],
    userPermissions: string[]
  ): boolean {

    if (userPermissions.includes(Permissions.ALL)) return true
    return requiredPermission.every((permission) =>
      userPermissions.includes(permission)
    );
  }


 /**
  * @note Must always come after the auth middleware. 
  * @param permissions 
  * @returns 
  */
  public static PermissionMiddleware = (permissions : Permissions[]) => (_ : Request, res : Response, next : NextFunction)=>{
    const userPermisions : ITokenData = res?.locals?.user;

    console.log(userPermisions);
    const hasPermission = PermissionValidation.checkUserPermission(permissions, userPermisions.permissions ?? []);
    if(!hasPermission){
        throw new ApiError(
            httpStatus.FORBIDDEN,
            "You do not have the required permission to complete this action"
        )
    }

    next();

  };
}
