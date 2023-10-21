import { Schema, model } from "mongoose";

const hyper = {
  name: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, required: true },
  favorites: { type: [Schema.Types.ObjectId], required: true },
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
