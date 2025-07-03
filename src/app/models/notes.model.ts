import { model, Schema } from "mongoose";

const noteSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    enum: ["work", "personal", "other"],
    default: "personal",
  },
  tags: {
    label: { type: String, required: true },
    color: { type: String, default: "blue" },
  },
  pinned: {
    type: Boolean,
    default: false,
  },
});
//model
export const Note = model("Note", noteSchema);