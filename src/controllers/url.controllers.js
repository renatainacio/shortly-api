import { db } from "../database/database.connection.js";

export async function postUrl(req, res){
    try{
        res.sendStatus(200);
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