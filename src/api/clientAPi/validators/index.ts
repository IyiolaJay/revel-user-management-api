import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";

const paginationParams = RequestValidator.requestItemsStructure({
    offset : Joi.string().required(),
    limit : Joi.string(),
    establishmentId : Joi.string(),
    createdAt_range : Joi.string()
})


export default {
    paginationParams
}