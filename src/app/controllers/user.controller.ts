import express, {Request, Response } from "express";
import { User } from "../models/user.model";
import z from "zod";


export const userRoutes =express.Router();
const createUserZodSchema =z.object({
    firstName:z.string(),
    lastName: z.string(),
    age:z.number(),
    email:z.string(),
    password:z.string(),
    role:z.string().optional()
})
//create user 
userRoutes.post("/create-user",async(req:Request,res:Response)=>{
try{

 const body =await createUserZodSchema.parseAsync(req.body);
//  const user =await User.create(body)
console.log(body,"zod body");


 res.status(201).json({
    success:true,
    message:"user created successfully",
    user:{}
 })
}
catch(error:any){
    console.error(error)
    res.status(400).json({
        success:false,
        message:error.message,
        error
    })
}
})

//find all user 
userRoutes.get("/",async(req:Request,res:Response)=>{
    const user =await User.find()
    res.status(201).json({
        success:true,
        message:"All user fetched successfully",
        user

    })

})

//find a user
userRoutes.get("/:id",async(req:Request,res:Response)=>{
const user =await User.findOne()
res.status(201).json({
    success:true,
    message:"The user is find successfully ",
    user
})
})
userRoutes.put("/updated-user/:id", async (req: Request, res: Response) =>{
    const {id}= req.params;
    console.log(id)
    const updatedUserBody =req.body;
    const updatedUser =await User.findByIdAndUpdate(id, updatedUserBody,{
        new: true,
    runValidators: true,
    });
    res.status(201).json({
        success:true,
        message:"The user is updated Successfully",
        updatedUser,
    })

})


userRoutes.delete("/delete-user/:id",async(req:Request,res:Response)=>{
    const {id} =req.params;
    const deletedUser =await User.findByIdAndDelete(id)
    res.status(201).json({
        success:true,
        message:"The user is deleted",
        deletedUser
    })

})