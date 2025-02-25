import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";

const updateClient = RequestValidator.requestItemsStructure({
      email: Joi.string().email(),
      first_name: Joi.string(),
      last_name: Joi.string(),
      establishmentId: Joi.array().items(Joi.number()),
      establishmentUrl: Joi.string()
      .custom((value, _) => {
        if (!value.startsWith('http://') && !value.startsWith('https://')) {
          return `https://${value}`; // Prepend https:// if not already present
        }
        return value; // Leave the value unchanged if it starts with http:// or https://
      }, 'Prepend https:// if missing'),
      phone : Joi.object({
        countryCode : Joi.string(),
        number : Joi.string()
      }),
      company : Joi.string()
})

const searchClient = RequestValidator.requestItemsStructure({
      searchText: Joi.string().required(),
      offset: Joi.number().required(),
      limit: Joi.number(),
})

const updatePassword = RequestValidator.requestItemsStructure({
       password: Joi.string().required()
});


const createClient = RequestValidator.requestItemsStructure({
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: Joi.object({
    country_code: Joi.string().required(),
    number: Joi.string().required(),
  }),
});



export default {
    updateClient,
    searchClient,
    updatePassword,
    createClient
}