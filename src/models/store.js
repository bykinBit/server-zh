import mongoose from "mongoose";
const { Schema, model } = mongoose;
const StoreSchema = new Schema(
  {
    title: String,
    hint: String,
    images: Array,
    newsId: String,
    uId: String,
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
export const Store = model("store", StoreSchema);
