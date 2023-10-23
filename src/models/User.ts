import { Schema, model } from "mongoose";

const comment = {
  postID: { type: Schema.Types.ObjectId, required: true },
  commentID: { type: Schema.Types.ObjectId, required: true },
};

const hyper = {
  name: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, required: true },
  favorites: { type: [Schema.Types.ObjectId], required: true },
  likes: { type: [comment], required: true },
  dislikes: { type: [comment], required: true },
};

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hypers: {
    type: [hyper],
    required: true,
  },
});

const User = model("users", userSchema);

export default User;
