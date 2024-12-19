import mongoose, { Model, Schema } from "mongoose";
import { IService } from "../../interfaces/service.interface";
import { Currency } from "../../utilities/enums/enum";

const serviceSchema = new Schema<IService>(
  {
    serviceName: {
      type: String,
      required : true,
      unique : true,
    },
    serviceDescription: {
      type: String,
      default : " "
    },
    serviceCost : {
      type : Number,
      required : true,
      default : 0.0
    },
    serviceCostCurrency:{
        type : String,
        required : true,
        enum : Object.keys(Currency),
        default : Currency.USD
    },
    serviceTenureType:{
        type : String,
        required : true,
        default : "MONTH"
    },
    minimumTenureDuration:{
        type : Number,
        required : true,
        default : 6,
    },
    createdBy:{
      type : String,
      required : true
    }
    
},
  {
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
        return ret;
      },
    },
  }
);


const Service: Model<IService> = mongoose.model("services", serviceSchema);

export default Service;
