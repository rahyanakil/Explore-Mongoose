import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";
import validator from "validator";
import { Note } from "./notes.model";
import {
  IUser,
  UserInstanceMethods,
  UserStaticMethods,
} from "../interfaces/user.interface";

// Define addressSchema or import it if defined elsewhere
const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>(
  {
    firstName: {
      type: String,
      required: [true, "firstName keno dao nai"],
      trim: true,
      minlength: [3, "First Name must be at least 3 characters,got {VALUE}"],
      maxlength: 10,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must be 3 characters"],
      maxlength: 10,
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Age must be at least 18,got {VALUE}"],
      age: 60,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email common hoye giyeche"],

      trim: true,
      // validate:{
      //     validator:function(value){
      //         return /\d{3}-\d{3}-\d{4}/.test(value)
      //     },
      //     message:function (props){
      //         return `Email ${props.value} is not valid email`
      //     }
      // }
      validate: [validator.isEmail, "Invalid Email {VALUE}"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    address: {
      type: addressSchema,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  }
);

userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});
// This method is used to compare the plain password with the hashed password using static method
userSchema.static("hashpassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);

  return password;
});
//prehooks:
//document Middleware 
userSchema.pre("save", async function(next)  {
  //   console.log("inside pre save hook");
  //   console.log(this);
  this.password = await bcrypt.hash(this.password, 10);
  next()
});
//query middleware 
userSchema.pre("find",function(next){
    console.log("Inside pre find hook");
    next()
    
})
//post hook 
//Query middle ware 
userSchema.post("findOneAndDelete", async function (doc,next) {
  if (doc) {
    // console.log(doc);
     await Note.deleteMany({ user: doc._id });
  }
  next()
});
//document midleware 
userSchema.post('save',function(doc,next){
    // console.log(`${doc.email} has been saved`);
    next()
})

userSchema.virtual('fullName0').get(function(){
    return `${this.firstName} ${this.lastName}`
})


export const User = model<IUser, UserInstanceMethods>("User", userSchema);
