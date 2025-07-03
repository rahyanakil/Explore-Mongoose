import express, { Application, Request, Response } from "express";
import { notesRoutes } from "./app/controllers/notes.controller";
import { userRoutes } from "./app/controllers/user.controller";

const app: Application = express();
//middleware
app.use(express.json());
//schema
app.use("/notes",notesRoutes)
app.use("/user",userRoutes)

//root route 
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to Note App");
});

export default app;


//mvc -->Model View Controller