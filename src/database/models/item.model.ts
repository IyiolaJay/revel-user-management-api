import mongoose, { Model, Schema } from "mongoose";
import { IItem } from "../../interfaces/item.interface";
import { Currency } from "../../utilities/enums/enum";

const itemSchema = new Schema<IItem>(
  {
    itemName: {
      type: String,
      required: true,
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
      enum : Object.keys(Currency),
      default : "KWD"
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
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


const Item: Model<IItem> = mongoose.model("items", itemSchema);

export default Item;
