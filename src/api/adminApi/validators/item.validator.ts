import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";
import { Currency } from "../../../utilities/enums/enum";

const createItemSchema = RequestValidator.requestItemsStructure({
    itemName: Joi.string().required(),
    cost: Joi.number().required(),
    currency: Joi.string().required().valid(...Object.keys(Currency)),
    description: Joi.string(),
    categoryName : Joi.string().required(),
});

const updateItemSchema = RequestValidator.requestItemsStructure({
    itemName: Joi.string(),
    cost: Joi.number(),
    description: Joi.string(),
    categoryId : Joi.string(),
});



export default {
    createItemSchema,
    updateItemSchema,
};