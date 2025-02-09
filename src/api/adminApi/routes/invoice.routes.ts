import AccessControl from "../../../middlewares/access.control.middleware";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import RequestValidator from "../../../middlewares/schema.middleware";
import BaseRoute from "../../../utilities/base.router";
import { AdminType } from "../../../utilities/enums/enum";
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
            RequestValidator.validateRequestSchema(invoiceValidator.createInvoiceSchema),
            authenticationMiddleware.AuthorizeUser,
            AccessControl.restrictTo([AdminType.BUSINESS_REGULAR_ADMIN, AdminType.BUSINESS_SUPER_ADMIN], false),
            invoiceController.createInvoice
        );

        this.router.get(
            "/getInvoices",
            authenticationMiddleware.AuthorizeUser,
            AccessControl.restrictTo([AdminType.BUSINESS_REGULAR_ADMIN, AdminType.BUSINESS_SUPER_ADMIN]),
            invoiceController.getInvoices
        );

        this.router.patch(
            "/editInvoice/:invoiceId",
            RequestValidator.validateRequestSchema(invoiceValidator.updateInvoiceSchema),
            authenticationMiddleware.AuthorizeUser,
            AccessControl.restrictTo([AdminType.BUSINESS_REGULAR_ADMIN, AdminType.BUSINESS_SUPER_ADMIN], false),
            invoiceController.editInvoice
        );

        this.router.get(
            "/getNextInvoiceNumber",
            authenticationMiddleware.AuthorizeUser,
            invoiceController.getNextInvoiceNumber
        );
    }
}