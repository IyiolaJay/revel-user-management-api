import mongoose, { Model, Schema } from "mongoose";
import { IBusinessAdmins } from "../../interfaces/business.interface";
import { AdminType } from "../../utilities/enums/enum";

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
    phone: {
      country_code: String,
      number: String,
    },
    device: {
      userAgent: String,
      ipAddress: String,
      rememberMeExpires: Date,
    },
    businessId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "businesses",
    },
    hasSetPassword: {
      type: Boolean,
      required: true,
      default: false,
    },
    adminType: {
      type: String,
      required: true,
      enum: Object.keys(AdminType),
      default: "BUSINESS_REGULAR_ADMIN",
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

const BusinessAdmins: Model<IBusinessAdmins> = mongoose.model(
  "businessAdmins",
  businessAdminSchema
);

export default BusinessAdmins;
