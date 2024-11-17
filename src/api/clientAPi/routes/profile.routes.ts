import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import BaseRoute from "../../../utilities/base.router";
import ClientProfileController from "../controllers/profile.controller";

export default class ClientProfileRoutes extends BaseRoute{
    constructor(){
        super();
    }

    protected override setupRoutes(): void {
        const clientProfileController : ClientProfileController = new ClientProfileController();
        const authenticationMiddleware :  AuthenticationMiddleware = new AuthenticationMiddleware();

        this.router.get(
            "/",
            authenticationMiddleware.AuthorizeUser,
            clientProfileController.GetProfile,
        )
    }
}