import mongoose, { Model, Schema } from "mongoose";
import { IBusinessAdmins } from "../../interfaces/business.interface";

const businessAdminSchema = new Schema<IBusinessAdmins>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    phone : {
      country_code : String,
      number : String
    },
    device: 
      {
        userAgent: String,
        ipAddress: String,
        rememberMeExpires: Date,
      },
    businessId : {
      required : Schema.Types.ObjectId,
      type: String,
      ref : "businesses"
    },
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.businessAdminId = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.device;
        return ret;
      },
    },
  }
);




const BusinessAdmins: Model<IBusinessAdmins> = mongoose.model("businessAdmins", businessAdminSchema);

export default BusinessAdmins;
