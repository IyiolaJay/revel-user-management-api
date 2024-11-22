import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";

const createOrderReceipt = RequestValidator.requestItemsStructure({
    items : Joi.array().required()
})

// const fetchOrderQuery = RequestValidator.requestItemsStructure({
//     offset : Joi.string().required(),
//     limit : Joi.string(),
// })


export default {
    createOrderReceipt,
}