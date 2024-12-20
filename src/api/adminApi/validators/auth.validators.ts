import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";
import { Permissions } from "../../../utilities/enums/permissions.enum";

const createAdmin = RequestValidator.requestItemsStructure({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  permissionSet: Joi.array().items(
    Joi.string()
      .valid(...Object.values(Permissions))
      .invalid(Permissions.ALL)
  ),
});

const loginAdmin = RequestValidator.requestItemsStructure({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const verifyToken = RequestValidator.requestItemsStructure({
  token: Joi.string().required(),
});

const changePassword = RequestValidator.requestItemsStructure({
  password: Joi.string().required(),
});

const changePasswordQuery = RequestValidator.requestItemsStructure({
  userId: Joi.string().required(),
});

const createClient = RequestValidator.requestItemsStructure({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  establishmentId: Joi.array().items(Joi.number()).required(),
  establishmentUrl: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .required()
    .custom((value, _) => {
        return value.replace(/\/$/, ''); // Removes trailing slash
    }),
  subscribedService: Joi.array().items(Joi.string().required()),
});

export default {
  createAdmin,
  createClient,
  loginAdmin,
  verifyToken,
  changePassword,
  changePasswordQuery,
};
