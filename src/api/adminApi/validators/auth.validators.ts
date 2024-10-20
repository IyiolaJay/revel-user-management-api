import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";

const createAdmin = RequestValidator.requestItemsStructure({
    email : Joi.string().email().required(),
    name : Joi.string().required(),
    password : Joi.string().required(),
})

const loginAdmin = RequestValidator.requestItemsStructure({
    email : Joi.string().email().required(),
    password : Joi.string().required(),
})

const verifyToken = RequestValidator.requestItemsStructure({
    token : Joi.string().required(),
})



export default {
    createAdmin,
    loginAdmin,
    verifyToken
}