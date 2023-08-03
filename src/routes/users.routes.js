import { Router } from "express";
import { getRanking, getUser, signIn, signUp } from "../controllers/users.controllers.js";

const userRouter = Router();

userRouter.post("/signup", signUp);

userRouter.post("/signin", signIn);

userRouter.get("/users/me", getUser);

userRouter.get("/ranking", getRanking);

export default userRouter;