import { Types } from "mongoose";

export interface INotes {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    role:"user"|"admin",
    userId:Types.ObjectId,

}

