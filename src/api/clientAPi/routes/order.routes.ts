// import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import RequestValidator from "../../../middlewares/schema.middleware";
import BaseRoute from "../../../utilities/base.router";
import OrderController from "../controllers/order.controller";
import filterValidators from "../validators";

export default class OrderRoutes extends BaseRoute{
    constructor(){
        super();
    }

    protected override setupRoutes(): void {
        const orderController : OrderController = new OrderController();
        const authenticationMiddleware :  AuthenticationMiddleware = new AuthenticationMiddleware();

        this.router.get(
            "/getEstablishmentOrders",
            RequestValidator.validateRequestSchema(filterValidators.paginationParams,"query"),
            authenticationMiddleware.AuthorizeUser,
            orderController.GetEstablishmentOrderReceipts,
        )
    }
}