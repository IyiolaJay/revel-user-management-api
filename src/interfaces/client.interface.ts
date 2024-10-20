import { Schema } from "mongoose";

export interface IClient {
  _id?: Schema.Types.ObjectId;
  establishmentId: Schema.Types.UUID;
  email: string;
  name: string;
  businessName: string;
  url: string;
  password : string;
  clientType : string;
  permissionSet : string[];
}
