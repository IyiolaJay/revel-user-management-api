import AccessControl from "../../../middlewares/access.control.middleware";
import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import RequestValidator from "../../../middlewares/schema.middleware";
import BaseRoute from "../../../utilities/base.router";
import { AdminType } from "../../../utilities/enums/enum";
import { CategoryController } from "../controllers/category.controller";
import categoryValidator from "../validators/category.validator";

export default class CategoryRoutes extends BaseRoute {
    constructor() {
        super();

    }

    protected override setupRoutes(): void {
        const categoryController: CategoryController = new CategoryController();
        const authenticationMiddleware: AuthenticationMiddleware = new AuthenticationMiddleware();

        this.router.post(
            "/createCategory",
            RequestValidator.validateRequestSchema(categoryValidator.createCategorySchema),
            authenticationMiddleware.AuthorizeUser,
            AccessControl.restrictTo([AdminType.BUSINESS_REGULAR_ADMIN, AdminType.BUSINESS_SUPER_ADMIN], false),
            categoryController.CreateCategory
        );

        this.router.get(
            "/getCategories",
            authenticationMiddleware.AuthorizeUser,
            categoryController.GetCategories
        );

        this.router.patch(
            "/editCategory/:categoryId",
            RequestValidator.validateRequestSchema(categoryValidator.createCategorySchema),
            authenticationMiddleware.AuthorizeUser,
            AccessControl.restrictTo([AdminType.BUSINESS_REGULAR_ADMIN, AdminType.BUSINESS_SUPER_ADMIN], false),
            categoryController.EditCategory
        );
    }
    
}