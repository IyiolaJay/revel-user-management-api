import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import PermissionValidation from "../../../middlewares/permission.middleware";
// import PermissionValidation from "../../../middlewares/permission.middleware";
import BaseRoute from "../../../utilities/base.router";
import { Permissions } from "../../../utilities/enums/permissions.enum";
// import { Permissions } from "../../../utilities/enums/permissions.enum";
import UsersProfileController from "../controllers/profile.controller";

export default class UserProfileRoutes extends BaseRoute{
    constructor(){
        super();
    }

    protected override setupRoutes(): void {
        const usersProfileController : UsersProfileController = new UsersProfileController();
        const authenticationMiddleware :  AuthenticationMiddleware = new AuthenticationMiddleware();

        this.router.get(
            "/",
            authenticationMiddleware.AuthorizeUser,
            usersProfileController.GetAuthenticatedProfile,
        )

        this.router.get(
            "/client/all",
            authenticationMiddleware.AuthorizeUser,
            usersProfileController.GetAllClientProfile,
        )


        this.router.patch(
            "/client/edit/:clientId",
            authenticationMiddleware.AuthorizeUser,
            PermissionValidation.PermissionMiddleware([Permissions.EDIT_CLIENT]),
            usersProfileController.EditClientProfile
        )

        this.router.get(
            "/client/:clientId",
            authenticationMiddleware.AuthorizeUser,
            usersProfileController.GetClientById,
        )
    }
}