import mongoose, {Model, Schema} from "mongoose";
import { IOtp } from "../../interfaces/token.interface";

const otpSchema = new Schema<IOtp>({
   otpToken : {
    type : String,
    required : true,
    maxlength : 5,
   },
   ownerId:{
      type: String, 
      require : true,
   },
   expiryInSecs: {
    type: Date,
    default: Date.now,
    index: {
      expires: 900, // document expires in 15mins
    },
  },
})

const OTP : Model<IOtp> = mongoose.model("otp", otpSchema);

export default OTP;