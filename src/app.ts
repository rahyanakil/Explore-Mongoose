import express, { Application, Request, Response } from "express";
import { notesRoutes } from "./app/controllers/notes.controller";

const app: Application = express();
//middleware
app.use(express.json());
//schema
app.use("/notes",notesRoutes)

//root route 
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to Note App");
});

export default app;


//mvc -->Model View Controller