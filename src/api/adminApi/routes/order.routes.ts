// import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import RequestValidator from "../../../middlewares/schema.middleware";
import BaseRoute from "../../../utilities/base.router";
import OrderController from "../controllers/order.controller";
import orderValidators from "../validators/order.validators";
export default class OrderReceiptRoutes extends BaseRoute{
    constructor(){
        super();
    }

    protected override setupRoutes(): void {
        const orderController : OrderController = new OrderController();

        this.router.get(
            "/all",
            RequestValidator.validateRequestSchema(orderValidators.fetchOrderQuery,"query"),
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