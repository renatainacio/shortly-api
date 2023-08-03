import { db } from "../database/database.connection.js";

export async function signUp(req, res){
    try{
        res.sendStatus(200);
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