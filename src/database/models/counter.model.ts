import mongoose, { Schema } from "mongoose";
import { ICounter } from "../../interfaces/invoice.interface";

const CounterSchema = new Schema<ICounter>({
    name: { type: String, required: true, unique: true },
    seq: { type: Number, required: true },
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
  
const Counter = mongoose.model<ICounter>("system_invoice_counter", CounterSchema);

export default Counter;