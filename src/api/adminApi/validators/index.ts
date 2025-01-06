import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";

const paginationAndFilterParams = RequestValidator.requestItemsStructure({
    offset : Joi.string(),
    limit : Joi.string(),
    // createdAt_range : Joi.string(),
    // establishmentId : Joi.number(),
    // clientId : Joi.string()
})


export default {
    paginationAndFilterParams,
}