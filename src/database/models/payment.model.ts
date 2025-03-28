import mongoose, { Model, Schema } from "mongoose";
import { IPayment } from "../../interfaces/payment.interface";

const paymentSchema = new Schema<IPayment>(
    {
        userId: {
            type: String,
            required: true,
        },
        paymentProofUrl: {
            type: String,
            required: true,
        },
        transactionId: {
            type: String,
        },
        businessId: {
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


const Payment: Model<IPayment> = mongoose.model("payment_proofs", paymentSchema);

export default Payment;
