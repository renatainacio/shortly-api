import { db } from "../database/database.connection.js";

export async function signUp(req, res){
    try{
        const { name, email, password, confirmPassword } = req.body;
        if (confirmPassword !== password)
            return res.sendStatus(409);
        const user = db.query(`
            SELECT *
            FROM users
            WHERE email=$1;
        `, [email]);
        if (user.rows.length != 0)
            return res.sendStatus(409);
        await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3);
        `), [name, email, password];
        res.sendStatus(201);
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res){
    try{
        res.sendStatus(200);
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function getUser(req, res){
    try{
        res.sendStatus(200);
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function getRanking(req, res){
    try{
        res.sendStatus(200);
    }catch (err){
        res.status(500).send(err.message);
    }
}