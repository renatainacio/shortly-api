import { Router } from "express";
import { deleteUrl, getUrlById, postUrl, redirectUrl } from "../controllers/url.controllers.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", postUrl);

urlRouter.get('/urls/:id', getUrlById);

urlRouter.get('/urls/open/:shortUrl', redirectUrl);

urlRouter.delete('/url/:id', deleteUrl);

export default urlRouter;