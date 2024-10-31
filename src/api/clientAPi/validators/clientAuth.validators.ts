import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";



const accountLogin = RequestValidator.requestItemsStructure({
    email : Joi.string().email().required(),
    password : Joi.string().required(),
})

const verifyToken = RequestValidator.requestItemsStructure({
    token : Joi.string().required(),
})

const changePassword = RequestValidator.requestItemsStructure({
    password : Joi.string().required(),
})

const changePasswordQuery = RequestValidator.requestItemsStructure({
    userId : Joi.string().required(),
})

export default {
    accountLogin,
    verifyToken,
    changePassword,
    changePasswordQuery
}