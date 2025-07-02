import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
const PORT = 5000;
async function main() {
  try {
    //connect to mongodb compass locally
    //  await mongoose.connect("mongodb://127.0.0.1:27017/your-database-name");

    await mongoose.connect(
      "mongodb+srv://rahyanakil89:4zPNcGHtim7JBIvF@cluster0.hvppqd2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("connected to mongodb");
    server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
