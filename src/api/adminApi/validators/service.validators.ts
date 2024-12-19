import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";
import { Currency } from "../../../utilities/enums/enum";



const createService = RequestValidator.requestItemsStructure({
    serviceName : Joi.string().required(),
    serviceDescription : Joi.string(),
    serviceCost : Joi.number().precision(2).required(),
    serviceCostCurrency : Joi.string().valid(...Object.keys(Currency)).required(),
    serviceTenureType : Joi.string().required(),
    minimumTenureDuration : Joi.number().precision(0),
})


const editService = RequestValidator.requestItemsStructure({
    serviceName : Joi.string(),
    serviceDescription : Joi.string(),
    serviceCost : Joi.number().precision(2),
    serviceCostCurrency : Joi.string().valid(...Object.keys(Currency)),
    serviceTenureType : Joi.string(),
    minimumTenureDuration : Joi.number().precision(0),
})

export default {
    createService,
    editService
}