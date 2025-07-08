import { Model, model, Schema } from "mongoose";
import { IUser, UserInstanceMethods, UserStaticMethods } from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs"

// Define addressSchema or import it if defined elsewhere
const addressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
});

const userSchema =new Schema<IUser,UserStaticMethods,UserInstanceMethods>({
    firstName:{
            type:String,
            required:[true,"firstName keno dao nai"],
            trim:true,
            minlength:[3,"First Name must be at least 3 characters,got {VALUE}"],
            maxlength:10
        },
        lastName:{
            type:String,
            required:true,
            trim:true,
            minlength:[3,"Name must be 3 characters"],
            maxlength:10
        },
        age: {
            type:Number,
            required:true,
            min:[18,"Age must be at least 18,got {VALUE}"],
            age:60,
        },
    email:{ 
        type:String,
        required:true,
        unique:[true,"Email common hoye giyeche"],

        trim:true,
        // validate:{
        //     validator:function(value){
        //         return /\d{3}-\d{3}-\d{4}/.test(value)
        //     },
        //     message:function (props){
        //         return `Email ${props.value} is not valid email`
        //     }
        // }
        validate:[validator.isEmail,"Invalid Email {VALUE}"]
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        required: true
    },
    address: {
        type: addressSchema,
    }
},
{
    versionKey: false,
    timestamps: true,
});

userSchema.static("hashpassword",async function(plainPassword:string){
const password =await bcrypt.hash(plainPassword,10)

return password
} )
export const User = model<IUser,UserInstanceMethods>("User", userSchema);