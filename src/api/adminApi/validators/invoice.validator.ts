import Joi from "joi";
import RequestValidator from "../../../middlewares/schema.middleware";
import { Currency } from "../../../utilities/enums/enum";

const createInvoiceSchema = RequestValidator.requestItemsStructure({
    draft: Joi.boolean().required(),
    due: Joi.number().required(),
    expiry: Joi.number().required(),
    description: Joi.string().required(),
    // mode: Joi.string(),
    note: Joi.string(),
    // notifications: Joi.object({
    //     channels: Joi.array().items(Joi.string()).required(),
    //     dispatch: Joi.boolean().required(),
    // }).required(),
    charge: Joi.object({
        receipt: Joi.object({
            email: Joi.boolean().required().default(true),
            sms: Joi.boolean().required().default(true),
        }).required(),
    }).required(),
    customer: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.object({
            country_code: Joi.string().required(),
            number: Joi.string().required(),
        }).required(),
    }).required(),
    statement_descriptor: Joi.string(),
    order: Joi.object({
        amount: Joi.number().required(),
        items: Joi.array().items(Joi.any()).required(),
        currency: Joi.string().required().default(Currency.KWD),
    }).required(),
    // retry_for_captured: Joi.boolean(),
});

const updateInvoiceSchema = RequestValidator.requestItemsStructure({
    due: Joi.number(),
    expiry: Joi.number(),
    charge: Joi.object({
        receipt: Joi.object({
            email: Joi.boolean().required().default(true),
            sms: Joi.boolean().required().default(true),
        }).required(),
    }),
    order: Joi.object({
        amount: Joi.number().required(),
        items: Joi.array().items(Joi.any()).required(),
        currency: Joi.string().required().default(Currency.KWD),
    })
});

export default {
    createInvoiceSchema,
    updateInvoiceSchema,
};