import { db } from "../database/database.connection.js";

export default async function validateAuth(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ","");
    if (!token) return res.sendStatus(401);
    try {
        const session = await db.query(`
            SELECT *
            FROM sessions
            WHERE token = $1
        `, [token]);
        if (session.rows.length === 0)
            return res.sendStatus(401);
        console.log("user authenticated");
        res.locals.session = session.rows[0];
    } catch (err){
        res.status(500).send(err.message);
    }
    next();
}
