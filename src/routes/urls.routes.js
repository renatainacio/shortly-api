import { Router } from "express";
import { deleteUrl, getUrlById, postUrl, redirectUrl } from "../controllers/urls.controllers.js";
import validateAuth from "../middlewares/validateAuth.js";
import validateSchema from "../middlewares/validateSchema.js";
import urlSchema from "../schemas/urls.schemas.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateAuth, validateSchema(urlSchema), postUrl);

urlRouter.get('/urls/:id', getUrlById);

urlRouter.get('/urls/open/:shortUrl', redirectUrl);

urlRouter.delete('/urls/:id', validateAuth, deleteUrl);

export default urlRouter;