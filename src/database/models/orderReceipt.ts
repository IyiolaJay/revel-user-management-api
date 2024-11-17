import mongoose, { Model, Schema } from "mongoose";
import IOrderReceipt from "../../interfaces/order.interface";

const orderReceiptSchema = new Schema<IOrderReceipt>({
  distributor_tin: {
    type: String,
    required: true,
  },
  message: {
    type: {
      num: String,
      ysdcid: String,
      ysdcrecnum: String,
      ysdcintdata: String,
      ysdcregsig: String,
      ysdcmrc: String,
      ysdcmrctim: String,
      ysdctime: String,
      flag: String,
      ysdcitems: String,
    },
    required : true
  },
  qr_code : {
    type : String,
    required : true
  }
});

const OrderReceipt: Model<IOrderReceipt> = mongoose.model(
  "orderReceipts",
  orderReceiptSchema
);

export default OrderReceipt;
