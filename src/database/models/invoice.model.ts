import mongoose, { Schema } from "mongoose";
import { IInvoice } from "../../interfaces/invoice.interface";
import Counter from "./counter.model";
// import AutoIncrement from 'mongoose-sequence';

const InvoiceSchema: Schema = new Schema<IInvoice>(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    tapInvoiceId : { type: Number, required: true, unique: true },
    invoiceUrl: { type: String, },
    draft: { type: Boolean, required: true },
    due: { type: Number, required: true },
    expiry: { type: Number, required: true },
    description: { type: String, required: true },
    mode: { type: String, required: true, default : "INVOICE" },
    note: { type: String, required: true,default : "test note" },
    notifications: {
      channels: { type: [String], required: true, default : ["EMAIL"] },
      dispatch: { type: Boolean, required: true, default : true },
    },
    metadata: {
      udf1: { type: String, required: true, default: "1" },
      udf2: { type: String, required: true, default: "2" },
      udf3: { type: String, required: true, default: "3" },
    },
    charge: {
      receipt: {
        email: { type: Boolean, required: true,default : true },
        sms: { type: Boolean, required: true,default : false },
      },
    },
    customer: { type: Schema.Types.Mixed, required: true },
    statement_descriptor: { type: String, required: true, default : "test" },
    order: {
      amount: { type: Number, required: true },
      items: { type: [Schema.Types.Mixed], required: true },
      currency: { type: String, required: true, default : "KWD" },
    },
    post: {
      url: { type: String, required: true, default : "www.edartee.com" },
    },
    redirect: {
      url: { type: String, required: true, default : "www.edartee.com" },
    },
    reference: {
      invoice: { type: String, required: true },
      order: { type: String, required: true },
    },
    retry_for_captured: { type: Boolean, required: true, default : true },
    createdBy: { type: String, required: true },
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

InvoiceSchema.pre("validate", async function (next) {
  const invoice = this as unknown as IInvoice;
  if (!invoice.invoiceNumber) {
    try {
      // Increment the sequence in the counter collection
      const name = invoice.draft ? "estimate" : "invoice";
      const counter = await Counter.findOneAndUpdate(
        { name: name },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      // Generate the invoice number in the desired format
      const seq = counter!.seq.toString().padStart(10, "0"); // Ensure 10 digits
      invoice.invoiceNumber = invoice.draft ? `EST_${seq}` : `INV_${seq}`;
      invoice.reference.invoice = invoice.invoiceNumber;
      invoice.reference.order = `ORD_${invoice.invoiceNumber.split("_")[1] ?? 0}`;
      next();
    } catch (error: any) {
      next(error);
    }
  } else {
    next(); // Skip if invoiceNumber already exists
  }
});

export default mongoose.model<IInvoice>("Invoice", InvoiceSchema);