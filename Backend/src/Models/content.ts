import mongoose, { Schema } from "mongoose";

const tagsType = [
  "Twitter post",
  "Twitter video post",
  "Youtube",
  "Instagram post",
  "Instagram video post",
];

const contentSchema = new mongoose.Schema({
  link: { type: String, required: true },
  title: { type: String, required: true },
  tags: {
    type: String,
    enum: tagsType,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Content = mongoose.model("Content", contentSchema);

export { Content };
