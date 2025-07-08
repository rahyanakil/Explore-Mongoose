import { Model } from "mongoose"

export interface IAddress{
    city:string,
    street:string,
    zip:number
}
export interface IUser {
    firstName:string,
    lastName:string,
    age:number,
    email:string,
    password:string,
    role:"user"|"admin",
    address:IAddress
}
//for dynamic instance methods
export interface UserInstanceMethods {
    hashpassword(password:string):string
}
//for static methods
export interface UserStaticMethods extends Model<IUser>{
    hashpassword(password:string):string
}