import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";

const createClient = RequestValidator.requestItemsStructure({
    email : Joi.string().email().required(),
    name : Joi.string().required(),
    password : Joi.string().required(),
})

const accountLogin = RequestValidator.requestItemsStructure({
    email : Joi.string().email().required(),
    password : Joi.string().required(),
})

const verifyToken = RequestValidator.requestItemsStructure({
    token : Joi.string().required(),
})



export default {
    createClient,
    accountLogin,
    verifyToken
}