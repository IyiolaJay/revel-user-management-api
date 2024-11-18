// import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import BaseRoute from "../../../utilities/base.router";
import OrderController from "../controllers/order.controller";
export default class OrderReceiptRoutes extends BaseRoute{
    constructor(){
        super();
    }

    protected override setupRoutes(): void {
        const orderController : OrderController = new OrderController();

        this.router.get(
            "/all",
            orderController.GetOrderReceipts,
        )
    }
}