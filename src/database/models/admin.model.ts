import mongoose, { Model, Schema } from "mongoose";
import { IAdmin } from "../../interfaces/admin.interface";
import { AdminType } from "../../utilities/enums/enum";
import { v4 as uuidV4 } from "uuid";


const adminSchema = new Schema<IAdmin>(
  {
    adminId: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidV4(),
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
    },
    hasSetPassword: {
      type: Boolean,
      required: true,
      default : false
    },
    adminType: {
      type: String,
      required: true,
      enum: Object.keys(AdminType),
      default: "REGULAR_ADMIN",
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




const Admin: Model<IAdmin> = mongoose.model("admins", adminSchema);

export default Admin;
