import { Request, Response, NextFunction } from "express";
import BaseController from "../../../utilities/base.controller";

  
class AuthController extends BaseController{
 
    
    // constructor(authService : AuthService){
    //     super();
    //     this.authService  = authService ;
    // }

    /**
     * 
     * */ 
    SendInvoice = this.wrapAsync(async(_: Request, res: Response, __: NextFunction) => {
        // const {body} = req;
        this.sendResponse(res, 200, {
            success: true,
            message: ``,
            data : null
        });
    })


}

export default AuthController;