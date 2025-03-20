import Joi from "joi"
import RequestValidator from "../../../middlewares/schema.middleware"
import { Permissions } from "../../../utilities/enums/permissions.enum";

const addTapCredentials = RequestValidator.requestItemsStructure({
    secretKey : Joi.string().required()
})

const createBusinessAdmin = RequestValidator.requestItemsStructure({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    permissionSet: Joi.array().items(
      Joi.string()
        .valid(...Object.values(Permissions))
        .invalid(Permissions.ALL)
    ),
  });

export default {
    createBusinessAdmin,
    addTapCredentials,
}