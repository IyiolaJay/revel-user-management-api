import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";

const editClient = RequestValidator.requestItemsStructure({
    email : Joi.string().email().required(),
    name : Joi.string().required(),
    establishmentId : Joi.array().items(Joi.number()).required(),
    establishmentUrl : Joi.string().uri().required(),
})


export default {
    editClient
}