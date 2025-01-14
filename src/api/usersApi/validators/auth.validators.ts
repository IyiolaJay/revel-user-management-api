import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";
import { Permissions } from "../../../utilities/enums/permissions.enum";

const createAdmin = RequestValidator.requestItemsStructure({
    email : Joi.string().email().required(),
    name : Joi.string().required(),
    permissionSet : Joi.array().items(Joi.string().valid(...Object.values(Permissions)).invalid(Permissions.ALL))
})

const loginAccount = RequestValidator.requestItemsStructure({
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
    clientId : Joi.string(),
    adminId : Joi.string()
})

// const createClient = RequestValidator.requestItemsStructure({
//     email : Joi.string().email().required(),
//     name : Joi.string().required(),
//     establishmentId : Joi.string().required(),
//     establishmentUrl : Joi.string().required(),
// })


export default {
    createAdmin,
    // createClient,
    loginAccount,
    verifyToken,
    changePassword,
    changePasswordQuery
}