import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import RequestValidator from "../../../middlewares/schema.middleware";
import BaseRoute from "../../../utilities/base.router";
import OfferingController from "../controllers/offering.controller";
import offeringValidator from "../validators/offering.validator";

export default class OfferingRoutes extends BaseRoute {
    constructor() {
        super();
    }

    protected override setupRoutes(): void {
        const offeringController: OfferingController = new OfferingController();
        const authenticationMiddleware: AuthenticationMiddleware = new AuthenticationMiddleware();

        this.router.post(
            "/offerings",
            authenticationMiddleware.AuthorizeUser,
            RequestValidator.validateRequestSchema(offeringValidator.createOfferingSchema),
            offeringController.CreateOffering
        );

        this.router.get(
            "/offerings",
            authenticationMiddleware.AuthorizeUser,
            offeringController.GetOfferings
        );

        this.router.patch(
            "/offerings/:offeringId",
            authenticationMiddleware.AuthorizeUser,
            RequestValidator.validateRequestSchema(offeringValidator.updateOfferingSchema),
            offeringController.EditOffering
        );
    }
}