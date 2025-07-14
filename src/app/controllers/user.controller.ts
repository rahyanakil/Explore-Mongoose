import express, { Request, Response } from "express";
import z from "zod";
import { User } from "../models/user.model";

export const userRoutes = express.Router();
const createUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});
//create user
userRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
     const body =await createUserZodSchema.parseAsync(req.body);

    // const password =await bcrypt.hash(body.password,10)

    //   body.password =password

    //built in custom instance method

    //  const user =new User(body);
    // const password =await user.hashpassword(body.password)
    // console.log(password)
    // user.password =password as string
    //  await user.save()//instance method
    // const body = req.body;
    //built in custom static methods
    // const password = await User.hashpassword(body.password)
    // console.log(password,"static");
    // body.password=password

    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: user,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

//find all user
userRoutes.get("/", async (req: Request, res: Response) => {
  const user = await User.find();
  res.status(201).json({
    success: true,
    message: "All user fetched successfully",
    user,
  });
});

//find a user
userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const user = await User.findOne();
  res.status(201).json({
    success: true,
    message: "The user is find successfully ",
    user,
  });
});
userRoutes.put("/updated-user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const updatedUserBody = req.body;
  const updatedUser = await User.findByIdAndUpdate(id, updatedUserBody, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    success: true,
    message: "The user is updated Successfully",
    updatedUser,
  });
});

userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
    // const user = await User.findOneAndDelete({_id:userId});
  const user = await User.findOneAndDelete({ _id: userId });
  res.status(201).json({
    success: true,
    message: "The user is deleted",
    user,
  });
});
