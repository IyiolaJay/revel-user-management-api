import mongoose, { Model, Schema } from "mongoose";
import { IOffering } from "../../interfaces/offering.interface";
import { Currency } from "../../utilities/enums/enum";

const offeringSchema = new Schema<IOffering>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      enum: Object.keys(Currency),
      default: "KWD",
    },
    categoryId: {
      type: String,
      ref: "categories",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["PRODUCT", "SERVICE"],
    },
    businessId: {
      type: String,
      ref: "businesses",
      default: null,
    },
    createdBy: {
      type: String,
      required: true,
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
        return ret;
      },
    },
  }
);

const Offering: Model<IOffering> = mongoose.model("offerings", offeringSchema);

export default Offering;
