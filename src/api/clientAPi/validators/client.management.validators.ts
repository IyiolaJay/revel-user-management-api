import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";

const updateClient = RequestValidator.requestItemsStructure({
      email: Joi.string().email(),
      name: Joi.string(),
      establishmentId: Joi.array().items(Joi.number()),
      establishmentUrl: Joi.string()
      .custom((value, _) => {
        if (!value.startsWith('http://') && !value.startsWith('https://')) {
          return `https://${value}`; // Prepend https:// if not already present
        }
        return value; // Leave the value unchanged if it starts with http:// or https://
      }, 'Prepend https:// if missing'),
})


export default {
    updateClient,
}