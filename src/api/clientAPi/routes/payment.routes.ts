import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import BaseRoute from "../../../utilities/base.router";
import PaymentController from "../controllers/payment.controller";

export default class PaymentRoutes extends BaseRoute{
    constructor(){
        super();
    }

    protected override setupRoutes(): void {
        const paymentController : PaymentController = new PaymentController();
        const authenticationMiddleware :  AuthenticationMiddleware = new AuthenticationMiddleware();

        this.router.post(
            "/callback",
            authenticationMiddleware.AuthorizeUser,
            paymentController.TapPaymentCallback,
        )

        this.router.post(
            "/upload-payment-proof",
            // authenticationMiddleware.AuthorizeUser,
            paymentController.UploadPaymentProof,
        )
    }
}