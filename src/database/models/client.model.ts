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
    establishmentId: {
      type: String,
      required: true,
    },
    establishmentUrl: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isGeneratedPassword: {
      type: Boolean,
      required: true,
      default : true
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
  },
  {
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
        delete ret.password;
        // delete ret.isGeneratedPassword;
        return ret;
      },
    },
  }
);

const Client: Model<IClient> = mongoose.model("clients", clientSchema);

export default Client;
