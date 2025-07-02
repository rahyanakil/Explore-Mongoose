import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
const app: Application = express();
//middleware
app.use(express.json());
//schema
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
const Note = model("Note", noteSchema);
app.post("/note/create-note", async (req: Request, res: Response) => {
  const body = req.body;

  //Approach 1 of creating a data
  //   const myNote = new Note({
  //     title: "Mongodb Note",
  //     tags: {
  //       label: "database",
  //     },
  //   });
  //   const savedNote = await myNote.save();
  //Approach 2 of creating a data
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note Created Successfully",
    note,
  });
});
app.get("/note", async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.status(200).json({
    success: true,
    message: "All notes fetched successfully",
    notes,
  });
});
app.get("/note/:id", async (req: Request, res: Response) => {
  const note = await Note.findOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Note fetched successfully",
    note,
  });
});

app.put("/note/updated-note/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedBody = req.body;
  const updatedNote = await Note.findByIdAndUpdate(id, updatedBody, {
    new: true,
    runValidators: true,
  });
  //   const updatedNote = await Note.updateOne({ _id: id }, { $set: updatedBody }, { new: true, runValidators: true });
  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    updatedNote,
  });
});

app.delete("/note/delete-note/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const deleteNote = await Note.findByIdAndDelete(noteId);
  //   const updatedNote = await Note.deleteOne({ _id: id });
  res.status(200).json({
    success: true,
    message: "Note deleted Successfully",
    deleteNote,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to Note App");
});

export default app;
