import { Router } from "express";
import { getRanking, getUser, signIn, signUp } from "../controllers/users.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import userSchema from "../schemas/users.schemas.js";
import authSchema from "../schemas/auth.schemas.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(userSchema), signUp);

userRouter.post("/signin", validateSchema(authSchema), signIn);

userRouter.get("/users/me", getUser);

userRouter.get("/ranking", getRanking);

export default userRouter;