import mongoose, { Model, Schema } from "mongoose";
import { ClientType } from "../../utilities/enums/enum";
import { IClient } from "../../interfaces/client.interface";
import { v4 as uuidV4} from "uuid";

const clientSchema = new Schema<IClient>(
  {
    clientId: {
      type: String,
      required: true,
      unique : true,
      default : () => uuidV4(),
    },
    creatorId:{
      type: String,
      required: true,
    },
    establishmentId: {
      type: [Number],
      required: true,
      default : []
    },
    establishmentUrl: {
      type: String,
      required: true,
      default : " "
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
      required: true,
      minlength: 8,
    },
    hasSetPassword: {
      type: Boolean,
      required: true,
      default : false
    },
    clientType: {
      type: String,
      required: true,
      enum: Object.keys(ClientType),
      default: "CLIENT_USER",
    },
    permissionSet: {
      type: [String],
      required: true,
      default: [],
    },
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
    hasAccount : {
      type : Boolean,
      required : true,
      default : false
    }
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
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
