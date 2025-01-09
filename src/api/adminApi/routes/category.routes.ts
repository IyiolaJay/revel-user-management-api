import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import RequestValidator from "../../../middlewares/schema.middleware";
import BaseRoute from "../../../utilities/base.router";
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
            authenticationMiddleware.AuthorizeUser,
            RequestValidator.validateRequestSchema(categoryValidator.createCategorySchema),
            categoryController.CreateCategory
        );

        this.router.get(
            "/categories",
            authenticationMiddleware.AuthorizeUser,
            categoryController.GetCategories
        );

        this.router.patch(
            "/editCategory/:categoryId",
            authenticationMiddleware.AuthorizeUser,
            RequestValidator.validateRequestSchema(categoryValidator.createCategorySchema),
            categoryController.EditCategory
        );
    }
    
}