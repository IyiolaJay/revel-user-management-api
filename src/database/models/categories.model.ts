import mongoose, { Model, Schema } from "mongoose";
import { ICategory } from "../../interfaces/categories.interface";

const categorySchema = new Schema<ICategory>(
  {
    categoryName: {
      type: String,
      required : true,
      unique : true
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


const Category: Model<ICategory> = mongoose.model("category", categorySchema);

export default Category;
