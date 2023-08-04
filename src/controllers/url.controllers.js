import { db } from "../database/database.connection.js";
import { nanoid } from 'nanoid';

export async function postUrl(req, res){
    try{
        const { url } = req.body;
        if (!url)
            return res.status(422).send("Invalid Url!");
        const shortUrl = nanoid();
        const result = await db.query(`
            INSERT INTO urls (url, "userId", "shortUrl")
            VALUES ($1, $2, $3)
            RETURNING id;
        `, [url, res.locals.session.userId, shortUrl]);
        res.status(201).send({id: result.rows[0].id, shortUrl: shortUrl});
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function getUrlById(req, res){
    const { id } = req.params; 
    try{
        const url = await db.query(`
            SELECT *
            FROM urls
            WHERE id=$1;
        `, [id]);
        if (url.rows.length === 0) return res.sendStatus(404);
        return res.send({
            id,
            shortUrl: url.rows[0].shortUrl,
            url: url.rows[0].url
        });
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function redirectUrl(req, res){
    const { shortUrl } = req.params;
    try{
        const url = await db.query(`
            SELECT *
            FROM urls
            WHERE "shortUrl"=$1;
        `, [shortUrl]);
        if (url.rows.length === 0)
            return res.sendStatus(404);
        await db.query(`
            INSERT INTO accesses ("urlId")
            VALUES ($1);
        `, [url.rows[0].id]);
        res.redirect(url.rows[0].url);
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res){
    const { id } = req.params;
    try{
        const url = await db.query(`
            SELECT *
            FROM urls
            WHERE id=$1;
        `, [id]);
        if (url.rows.length === 0) return res.sendStatus(404);
        if (res.locals.session.userId !== url.rows[0].userId)
            return res.sendStatus(401);
        await db.query(`
            DELETE
            FROM urls
            WHERE id=$1
        `, [id]);
        res.sendStatus(204);
    }catch (err){
        res.status(500).send(err.message);
    }
}