import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";

const paginationAndFilterParams = RequestValidator.requestItemsStructure({
    offset : Joi.string(),
    limit : Joi.string(),
    from : Joi.string().isoDate(),
    to : Joi.string().isoDate(),
    establishmentId : Joi.number(),
    clientId : Joi.string()
})


export default {
    paginationAndFilterParams,
}