import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import BaseRoute from "../../../utilities/base.router";
import AdminProfileController from "../controllers/profile.controller";

export default class AdminProfileRoutes extends BaseRoute{
    constructor(){
        super();
    }

    protected override setupRoutes(): void {
        const adminProfileController : AdminProfileController = new AdminProfileController();
        const authenticationMiddleware :  AuthenticationMiddleware = new AuthenticationMiddleware();

        this.router.get(
            "/",
            authenticationMiddleware.AuthorizeUser,
            adminProfileController.GetProfile,
        )
    }
}