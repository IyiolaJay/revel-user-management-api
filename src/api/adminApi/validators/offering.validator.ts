import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";
import { Currency } from "../../../utilities/enums/enum";

const createOfferingSchema = RequestValidator.requestItemsStructure({
    name: Joi.string().required(),
    cost: Joi.number().required(),
    currency: Joi.string().required().valid(...Object.keys(Currency)),
    description: Joi.string(),
    categoryName : Joi.string().required(),
    type : Joi.string().valid("PRODUCT", "SERVICE").required(),
});

const updateOfferingSchema = RequestValidator.requestItemsStructure({
    name: Joi.string(),
    cost: Joi.number(),
    description: Joi.string(),
    categoryId : Joi.string(),
});



export default {
    createOfferingSchema,
    updateOfferingSchema,
};