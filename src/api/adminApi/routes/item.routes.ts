import AuthenticationMiddleware from "../../../middlewares/authentication.middleware";
import RequestValidator from "../../../middlewares/schema.middleware";
import BaseRoute from "../../../utilities/base.router";
import { ItemController } from "../controllers/item.controller";
import itemValidator from "../validators/item.validator";

export default class ItemRoutes extends BaseRoute {
    constructor() {
        super();
    }

    protected override setupRoutes(): void {
        const itemController: ItemController = new ItemController();
        const authenticationMiddleware: AuthenticationMiddleware = new AuthenticationMiddleware();

        this.router.post(
            "/createItem",
            authenticationMiddleware.AuthorizeUser,
            RequestValidator.validateRequestSchema(itemValidator.createItemSchema),
            itemController.CreateItem
        );

        this.router.get(
            "/getItems",
            authenticationMiddleware.AuthorizeUser,
            itemController.GetItems
        );

        this.router.patch(
            "/editItem/:itemId",
            authenticationMiddleware.AuthorizeUser,
            RequestValidator.validateRequestSchema(itemValidator.updateItemSchema),
            itemController.EditItem
        );
    }
}