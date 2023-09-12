import mongoose from "mongoose";
const { Schema, model } = mongoose;
const CodeSchema = new Schema(
  {
    phone: String,
    code: String,
    time: String, //更新时间
    state: Number, //0表示新鲜 1表示过期
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, result) {
        result.id = result._id;
        delete result._id;
        delete result.__v;
        return result;
      },
    },
  }
);
CodeSchema.statics.updateById = async function (id) {
  return await this.updateOne(
    {
      _id: id,
    },
    {
      state: 1,
    }
  );
};
export const PhoneCode = model("code", CodeSchema);
