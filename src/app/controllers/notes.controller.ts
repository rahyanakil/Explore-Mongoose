import express,{ Request, Response } from "express";

import { Note } from "../models/notes.model";

export const notesRoutes =express.Router()
notesRoutes.post("/create-note", async (req: Request, res: Response) => {
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
notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.status(200).json({
    success: true,
    message: "All notes fetched successfully",
    notes,
  });
});
notesRoutes.get("/:id", async (req: Request, res: Response) => {
  const note = await Note.findOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Note fetched successfully",
    note,
  });
});

notesRoutes.put("/updated-note/:id", async (req: Request, res: Response) => {
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

notesRoutes.delete("/note/delete-note/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const deleteNote = await Note.findByIdAndDelete(noteId);
  //   const updatedNote = await Note.deleteOne({ _id: id });
  res.status(200).json({
    success: true,
    message: "Note deleted Successfully",
    deleteNote,
  });
});