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
    country: Joi.string().required(),
    businessOwner : Joi.object({
        first_name : Joi.string().required(),
        last_name : Joi.string().required()
    }).required(),
    establishments : Joi.array().items(Joi.object({
        establishmentId : Joi.number().required(),
        establishmentUrl : Joi.string().uri().required()
    }))
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

const addTapCredentials = RequestValidator.requestItemsStructure({
    secretKey : Joi.string().required()
})



export default {
    createBusiness,
    updateBusiness,
    addTapCredentials,
}