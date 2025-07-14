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
    findOneAndDelete(arg0: { _id: string; }): unknown;
    findByIdAndDelete(id: string): unknown;
    findByIdAndUpdate(id: string, updatedUserBody: any, arg2: { new: boolean; runValidators: boolean }): unknown
    findOne(): unknown
    find(): unknown
    create(body: any): unknown
    hashpassword(password:string):string
}
//for static methods
export interface UserStaticMethods extends Model<IUser>{
    hashpassword(password:string):string
}