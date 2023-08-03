import { db } from "../database/database.connection.js";

export default async function validateAuth(req, res, next){
    const authorizaton = req.headers.authorizaton;
    const token = authorizaton?.replace("Bearer ","");
    if (!token) return res.sendStatus(401);

    try {
        
    } catch (err){
        res.status(500).send(err.message);
    }
    next();
}