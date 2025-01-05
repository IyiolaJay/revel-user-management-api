import mongoose, { Model, Schema } from "mongoose";
import {IOrderReceipt} from "../../interfaces/order.interface";

const orderReceiptSchema = new Schema<IOrderReceipt>({

  establishmentId: {
    type: Number,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
  orderItems: {
    type: Object,
    required: true,
  },
  orderReceipt: {
    type: Object,
    required : true
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

const OrderReceipt: Model<IOrderReceipt> = mongoose.model(
  "orderReceipts",
  orderReceiptSchema
);

export default OrderReceipt;
