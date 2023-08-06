import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { createSession, createUser, getUserByEmail, getUserDetail, queryRanking } from "../repository/users.respository.js";

export async function signUp(req, res){
    try{
        const { name, email, password, confirmPassword } = req.body;
        const hash = bcrypt.hashSync(password, 10);
        if (confirmPassword !== password)
            return res.sendStatus(422);
        const user = await getUserByEmail(email);
        if (user.rows.length !== 0)
            return res.sendStatus(409);
        await createUser(name, email, hash);
        res.sendStatus(201);
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res){
    const { email, password } = req.body;
    try{
        const user = await getUserByEmail(email);
        if (user.rows.length === 0)
            return res.sendStatus(401);
        const correctPassword = bcrypt.compareSync(password, user.rows[0].password);
        if(!correctPassword)
            return res.sendStatus(401);
        const token = uuid();
        await createSession(user.rows[0].id, token);
        res.status(200).send({token: token});
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function getUser(req, res){
    try{
        const user = await getUserDetail(res.locals.session.userId);
        const userDetails = {
            id: user.rows[0].id,
            name: user.rows[0].name,
            visitCount: user.rows.reduce((pv, cv) => pv + Number(cv.visitCount), 0),
            shortenedUrls: []
        };
        if (user.rows[0].url) {
            user.rows.forEach(register => userDetails.shortenedUrls.push({
                id: register.urlId,
                shortUrl: register.shortUrl,
                url: register.url,
                visitCount: register.visitCount
            }))
        }
        res.status(200).send(userDetails);
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function getRanking(req, res){
    try{
        const ranking = await queryRanking();
        res.status(200).send(ranking.rows);
    }catch (err){
        res.status(500).send(err.message);
    }
}