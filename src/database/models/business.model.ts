import mongoose, { Model, Schema } from "mongoose";
import { IBusiness } from "../../interfaces/business.interface";

const businessSchema = new Schema<IBusiness>(
  {
    businessEmail: {
      type: String,
      required: true,
      unique: true,
    },
    businessName: {
      type: String,
      required: true,
      unique: true,
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
    addressNumber : {
      required : true,
      type: String,
    },
    city : {
      required : true,
      type: String,
    },
    state : {
      required : true,
      type: String,
    },
     country: {
      required : true,
      type: String,
    },
    createdBy : {
      required : true,
      type : Schema.Types.ObjectId,
      ref : "admins"
    }
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.businessId = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.device;
        return ret;
      },
    },
  }
);




const Business: Model<IBusiness> = mongoose.model("businesses", businessSchema);

export default Business;
