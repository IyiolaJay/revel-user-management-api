import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";

const createCategorySchema = RequestValidator.requestItemsStructure({
    categoryName : Joi.string().required()
})


export default{
    createCategorySchema,
}