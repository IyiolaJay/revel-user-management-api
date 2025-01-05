// import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import PermissionValidation from "../../../middlewares/permission.middleware";
import RequestValidator from "../../../middlewares/schema.middleware";
import BaseRoute from "../../../utilities/base.router";
import { Permissions } from "../../../utilities/enums/permissions.enum";
import ServiceController from "../controllers/service.controller";
import filterValidators from "../validators";
import serviceValidators from "../validators/service.validators";

export default class ServiceRoutes extends BaseRoute{
    constructor(){
        super();
    }

    protected override setupRoutes(): void {
        const serviceController : ServiceController = new ServiceController();
        const authenticationMiddleware :  AuthenticationMiddleware = new AuthenticationMiddleware();

        this.router.post(
            "/createService",
            RequestValidator.validateRequestSchema(serviceValidators.createService),
            authenticationMiddleware.AuthorizeUser,
            PermissionValidation.PermissionMiddleware([Permissions.CREATE_SERVICE]),
            serviceController.CreateService,
        )

        //
        this.router.get(
            "/all",            
            RequestValidator.validateRequestSchema(filterValidators.paginationAndFilterParams,"query"),
            serviceController.GetAllService,
        )

        //
         //
         this.router.patch(
            "/edit/:serviceId",
            // authenticationMiddleware.AuthorizeUser,
            RequestValidator.validateRequestSchema(serviceValidators.editService),
            serviceController.EditService
        )

        //
        this.router.get(
            "/getService/:serviceId",
            // authenticationMiddleware.AuthorizeUser,
            serviceController.GetServiceById
        )
    }
}