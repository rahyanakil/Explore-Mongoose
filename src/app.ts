import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
const app: Application = express();
//schema
const noteSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    enum: ["work", "personal", "other"],
    default: "personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  },
});
//model
const Note = model("Note", noteSchema);
app.post("/create-note", async (req: Request, res: Response) => {
  const myNote = new Note({
    title: "Mongodb Note",
  });
  const savedNote = await myNote.save(); // Important!
  res.status(201).json({
    success: true,
    message: "Note Created Successfully",
    note: savedNote,
  });
});
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to Note App");
});

export default app;
