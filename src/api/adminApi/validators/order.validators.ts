import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";

const createOrderReceipt = RequestValidator.requestItemsStructure({
    items : Joi.array().items(Joi.object(
       { 
        establishmentId : Joi.number().required(),
        orderItems : Joi.object().required(),
        orderReceipt : Joi.object().required(),
        }
    )).required()
})

// const fetchOrderQuery = RequestValidator.requestItemsStructure({
//     offset : Joi.string().required(),
//     limit : Joi.string(),
// })


export default {
    createOrderReceipt,
}