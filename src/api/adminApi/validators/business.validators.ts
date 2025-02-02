import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";


const createBusiness = RequestValidator.requestItemsStructure({
    businessEmail: Joi.string().email().required(),
    businessName: Joi.string().required(),
    phone: Joi.object({
        country_code: Joi.string().required(),
        number: Joi.string().required()
    }).required(),
    addressNumber: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required()
});

const updateBusiness = RequestValidator.requestItemsStructure({
    businessEmail: Joi.string().email().optional(),
    businessName: Joi.string().optional(),
    phone: Joi.object({
        country_code: Joi.string().optional(),
        number: Joi.string().optional()
    }).optional(),
    addressNumber: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional()
});

export default {
    createBusiness,
    updateBusiness
}