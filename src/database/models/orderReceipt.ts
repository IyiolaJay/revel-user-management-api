import mongoose, { Model, Schema } from "mongoose";
import {IOrderReceipt} from "../../interfaces/order.interface";

const orderReceiptSchema = new Schema<IOrderReceipt>({
  orderItems: {
    type: Object,
    required: true,
  },
  orderReceipt: {
    type: Object,
    required : true
  },
});

const OrderReceipt: Model<IOrderReceipt> = mongoose.model(
  "orderReceipts",
  orderReceiptSchema
);

export default OrderReceipt;
