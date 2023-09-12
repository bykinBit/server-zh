import mongoose from "mongoose";
const { Schema, model } = mongoose;
import jwt from "jsonwebtoken";
const UserSchema = new Schema(
  {
    phone: String,
    name: String,
    avatar: String,
    type: Number, //1表示注册 2表示登录
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, result) {
        result.id = result._id;
        delete result._id;
        delete result.__v;
        delete result.createdAt;
        delete result.updatedAt;
        return result;
      },
    },
  }
);
UserSchema.statics.login = async function (phone) {
  return await this.findOne({ phone });
};
UserSchema.methods.getAccessToken = function () {
  let payload = { id: this._id };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY || "bykey", {
    expiresIn: "1h",
  });
};
export const User = model("user", UserSchema);
