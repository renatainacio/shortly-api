import { db } from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res){
    try{
        const { name, email, password, confirmPassword } = req.body;
        const hash = bcrypt.hashSync(password, 10);
        if (confirmPassword !== password)
            return res.sendStatus(422);
        const user = await db.query(`
            SELECT *
            FROM users
            WHERE email=$1;
        `, [email]);
        if (user.rows.length !== 0)
            return res.sendStatus(409);
        await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3);
        `, [name, email, hash]);
        res.sendStatus(201);
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res){
    const { email, password } = req.body;
    try{
        const user = await db.query(`
            SELECT *
            FROM users
            WHERE email=$1
        `, [email]);
        if (user.rows.length === 0)
            return res.sendStatus(401);
        const correctPassword = bcrypt.compareSync(password, user.rows[0].password);
        if(!correctPassword)
            return res.sendStatus(401);
        const token = uuid();
        await db.query(`
            INSERT INTO sessions ("userId", token)
            VALUES ($1, $2);
        `, [user.rows[0].id, token]);
        res.status(200).send({token: token});
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function getUser(req, res){
    try{
        const user = await db.query(`
            SELECT users.id, users.name, urls."shortUrl", urls.id as "urlId", urls.url, COUNT(accesses.id) as "visitCount"
            FROM users
            LEFT JOIN urls
            ON urls."userId"=users.id
            LEFT JOIN accesses
            ON urls.id=accesses."urlId"
            WHERE users.id=$1
            GROUP BY users.id, urls.id;
        `, [res.locals.session.userId]);
        const userDetails = {
            id: user.rows[0].id,
            name: user.rows[0].name,
            visitCount: user.rows.reduce((pv, cv) => pv + Number(cv.visitCount), 0),
            shortenedUrls: []
        };
        user.rows.forEach(register => userDetails.shortenedUrls.push({
            id: register.urlId,
            shortUrl: register.shortUrl,
            url: register.url,
            visitCount: register.visitCount
        }))
        res.status(200).send(userDetails);
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function getRanking(req, res){
    try{
        const ranking = await db.query(`
            SELECT users.id, users.name, COUNT(urls.id) as "linksCount", COUNT(accesses.id) as "visitCount"
            FROM users
            LEFT JOIN urls
            ON urls."userId"=users.id
            LEFT JOIN accesses
            ON urls.id=accesses."urlId"
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10;
        `);
        console.log(ranking.rows);
        res.status(200).send(ranking.rows);
    }catch (err){
        res.status(500).send(err.message);
    }
}