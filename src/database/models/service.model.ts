// import mongoose, { Model, Schema } from "mongoose";
// import { IUser } from "./_interfaces/user.interface";

// const userSchema = new Schema<IUser>(
//   {
//     email: {
//       type: String,
//     },
//     phoneNumber: {
//       type: String,
//     },
//     fullName: {
//       type: String,
//       default: null,
//     },
//     username : {
//       type : String,
//       unique : true,
//       default : " ",
//       required : true
//     },
//     password: {
//       type: String,
//       minlength: 8,
//       default: null,
//     },
//     avatarUrl: String,
//     dateOfBirth: { type: Date },
//     bio : {
//       type : String,
//       maxlength : 100,
//       default : ""
//     },
//     isVerified: {
//       type: Boolean,
//       default: false,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//     id: true,
//     toJSON: {
//       virtuals: true,
//       transform: (_, ret) => {
//         delete ret._id;
//         delete ret.password;
//         return ret;
//       },
//     },
//   }
// );


// userSchema.index(
//   { createdAt: 1 },
//   { expireAfterSeconds: 1000, partialFilterExpression: { password: null } }
// );

// const User: Model<IUser> = mongoose.model("users", userSchema);

// export default User;
