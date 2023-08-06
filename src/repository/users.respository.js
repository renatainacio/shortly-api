import { db } from "../database/database.connection.js";

export function getUserByEmail(email){
    const user = db.query(`
        SELECT *
        FROM users
        WHERE email=$1;
    `, [email]);
    return user;
}

export function createUser(name, email, password){
    const result = db.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3);
    `, [name, email, password]);
    return result;
}

export function createSession(userId, token){
    const result = db.query(`
        INSERT INTO sessions ("userId", token)
        VALUES ($1, $2);
    `, [userId, token]);
    return result;
}

export function getUserDetail(userId){
    const user  = db.query(`
            SELECT users.id, users.name, urls."shortUrl", urls.id as "urlId", urls.url, COUNT(accesses.id) as "visitCount"
            FROM users
            LEFT JOIN urls
            ON urls."userId"=users.id
            LEFT JOIN accesses
            ON urls.id=accesses."urlId"
            WHERE users.id=$1
            GROUP BY users.id, urls.id;
        `, [user]);
    return user;
}

export function queryRanking(){
    const result = db.query(`
            SELECT users.id, users.name, COUNT(DISTINCT urls.id) as "linksCount", COUNT(accesses.id) as "visitCount"
            FROM users
            LEFT JOIN urls
            ON urls."userId"=users.id
            LEFT JOIN accesses
            ON urls.id=accesses."urlId"
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10;
        `);
    return result;
}