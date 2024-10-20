import { NextFunction, Request, Response } from "express";
import Joi, { AnySchema, ObjectSchema } from "joi";
import ApiError from "../utilities/error.base";
import httpStatus from "http-status";

class RequestValidator {

    public static validateRequestSchema = (schema: Joi.ObjectSchema<any>, path: 'body' | 'params' | 'query' = 'body') => (req: Request, _: Response, next: NextFunction) => {
        const data = req[path];
    
        const { error } : any = schema.validate(data);
    
        if (error) {
          throw new ApiError(httpStatus.BAD_REQUEST, error.details[0].message)
        }
    
        return next();
      };

    // public  static requestItemsStructure (body : any){
    //     return Joi.object(body);
    // }
    public static requestItemsStructure(body: any | AnySchema) {
      let schema: ObjectSchema;
      if (Joi.isSchema(body)) {
          schema = body as ObjectSchema;
      } else {
          schema = Joi.object(body);
      }
      return schema;
  }
}

export default RequestValidator;