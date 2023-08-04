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
    try{
        res.sendStatus(200);
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function redirectUrl(req, res){
    try{
        res.sendStatus(200);
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res){
    try{
        res.sendStatus(200);
    }catch (err){
        res.status(500).send(err.message);
    }
}