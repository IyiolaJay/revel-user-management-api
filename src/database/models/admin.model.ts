import mongoose, { Model, Schema } from "mongoose";
import { IAdmin } from "../../interfaces/admin.interface";
import { AdminType } from "../../utilities/enums/enum";
import { v4 as uuidV4 } from "uuid";

const adminSchema = new Schema<IAdmin>(
  {
    adminId: {
      type: Schema.Types.UUID,
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
      minlength: 8,
    },
    adminType: {
      type: String,
      required: true,
      enum: Object.values(AdminType),
      default: AdminType.REGULAR_ADMIN,
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
        return ret;
      },
    },
  }
);

const Admin: Model<IAdmin> = mongoose.model("admins", adminSchema);

export default Admin;
