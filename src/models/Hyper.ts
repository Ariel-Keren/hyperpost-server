import { Schema, model } from "mongoose";

const comment = {
  text: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
};

const post = {
  title: { type: String, required: true },
  text: { type: String, required: true },
  createdBy: { type: String, required: true },
  favorites: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  comments: {
    type: [comment],
    required: true,
  },
};

const hyperSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  posts: { type: [post], required: true },
});

const Hyper = model("hypers", hyperSchema);

export default Hyper;
