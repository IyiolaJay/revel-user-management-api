import mongoose, { Model, Schema } from "mongoose";
import { IClient } from "../../interfaces/client.interface";

const clientSchema = new Schema<IClient>(
  {
    creatorId:{
      type: String,
      required: true,
    },
    businessId:{
      type: String,
      required: true,
      ref : "businesses"
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
    },
    hasSetPassword: {
      type: Boolean,
      required: true,
      default : false
    },
    // permissionSet: {
    //   type: [String],
    //   required: true,
    //   default: [],
    // },
    device: 
    {
      userAgent: String,
      ipAddress: String,
      rememberMeExpires: Date,
    },
    phone : {
      country_code : String,
      number : String
    },
    hasOnboarded : {
      type : Boolean,
      required : true,
      default : false
    },
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.clientId = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.device;
        return ret;
      },
    },
  }
);

const Client: Model<IClient> = mongoose.model("clients", clientSchema);

export default Client;
