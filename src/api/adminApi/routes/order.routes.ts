// import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import PermissionValidation from "../../../middlewares/permission.middleware";
import RequestValidator from "../../../middlewares/schema.middleware";
import BaseRoute from "../../../utilities/base.router";
import OrderController from "../controllers/order.controller";
import orderValidators from "../validators/order.validators";
import { Permissions } from "../../../utilities/enums/permissions.enum";

export default class OrderReceiptRoutes extends BaseRoute{
    constructor(){
        super();
    }

    protected override setupRoutes(): void {
        const orderController : OrderController = new OrderController();
        const authenticationMiddleware :  AuthenticationMiddleware = new AuthenticationMiddleware();

        
        this.router.get(
            "/all",
            authenticationMiddleware.AuthorizeUser,
            PermissionValidation.PermissionMiddleware([Permissions.VIEW_CLIENT]),
            orderController.GetOrderReceipts,
        )

        //
        this.router.put(
            "/createOrderReceipts",            
            RequestValidator.validateRequestSchema(orderValidators.createOrderReceipt),
            orderController.CreateOrderReceipts,
        )
    }
}