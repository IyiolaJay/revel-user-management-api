import mongoose, { Model, Schema } from "mongoose";
import { IActiveService } from "../../interfaces/service.interface";

const activeServiceSchema = new Schema<IActiveService>(
  {
    serviceId: {
      type: String,
      required : true,
      ref : "services"
    },
    clientId: {
      type: String,
      required : true,
    },
    startDate : {
        type : Date,
        default : Date.now,
    },
    expireDate:{
        type: Date,
        index: {
          expires: 1,
        },
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


const ActiveService: Model<IActiveService> = mongoose.model("activeServices", activeServiceSchema);

export default ActiveService;
