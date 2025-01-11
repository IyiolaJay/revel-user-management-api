import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import RequestValidator from "../../../middlewares/schema.middleware";
import BaseRoute from "../../../utilities/base.router";
import InvoiceController from "../controllers/invoice.controller";
import invoiceValidator from "../validators/invoice.validator";

export default class InvoiceRoutes extends BaseRoute {
    constructor() {
        super();
    }

    protected override setupRoutes(): void {
        const invoiceController: InvoiceController = new InvoiceController();
        const authenticationMiddleware: AuthenticationMiddleware = new AuthenticationMiddleware();

        this.router.post(
            "/createInvoice",
            authenticationMiddleware.AuthorizeUser,
            RequestValidator.validateRequestSchema(invoiceValidator.createInvoiceSchema),
            invoiceController.createInvoice
        );

        this.router.get(
            "/getInvoices",
            authenticationMiddleware.AuthorizeUser,
            invoiceController.getInvoices
        );

        this.router.patch(
            "/editInvoice/:invoiceId",
            authenticationMiddleware.AuthorizeUser,
            RequestValidator.validateRequestSchema(invoiceValidator.updateInvoiceSchema),
            invoiceController.editInvoice
        );

        this.router.get(
            "/getNextInvoiceNumber",
            authenticationMiddleware.AuthorizeUser,
            invoiceController.getNextInvoiceNumber
        );
    }
}