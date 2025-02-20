import mongoose, { Model, Schema } from "mongoose";
import {IEstablishment} from "../../interfaces/establishment.interface";

const establishmentSchema = new Schema<IEstablishment>(
  {
    businessId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "businesses",
    },
    establishmentId : {
        required : true,
        type : Number,
    },
    establishmentUrl : {
        required : true,
        type : String
    }
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

const Establishment: Model<IEstablishment> = mongoose.model("establishments", establishmentSchema);

export default Establishment;
