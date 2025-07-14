import { model, Schema } from "mongoose";

const bookSchema = new Schema({
  title: { type: String, required: true},
  author: { type: String,required:true },
  genre: {
    type: String,
    enum: ["FICTION"," NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    required:true
  },
  isbn:{
    type:String,
    required:true,
    unique:true
  },
  description:{
    type:String,
    default :"A brief summary or description of the book."
  },
  copies: {
    type:Number,
    required:true
  },
  available:{
    type:Boolean,
    default:true
  }

},{
  versionKey:false,
  timestamps:true
});
//model
export const Note = model("Book", bookSchema);

// title (string) — Mandatory. The book’s title.
// author (string) — Mandatory. The book’s author.
// genre (string) — Mandatory. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.
// isbn (string) — Mandatory and unique. The book’s International Standard Book Number.
// description (string) — Optional. A brief summary or description of the book.
// copies (number) — Mandatory. Non-negative integer representing total copies available.
// available (boolean) — Defaults to true. Indicates if the book is currently available for borrowing.



//    userId:{
//         type:Schema.Types.ObjectId,
//         ref:"User",
//         require:true
//     }