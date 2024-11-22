import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";

const paginationParams = RequestValidator.requestItemsStructure({
    offset : Joi.string().required(),
    limit : Joi.string(),
})


export default {
    paginationParams
}