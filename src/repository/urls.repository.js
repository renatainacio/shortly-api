import { db } from "../database/database.connection.js";

export function insertUrl(url, userId, shortUrl) {
    const result = db.query(`
            INSERT INTO urls (url, "userId", "shortUrl")
            VALUES ($1, $2, $3)
            RETURNING id;
        `, [url, userId, shortUrl]);
    return result;
};

export function getUrl(id){
    const url = db.query(`
        SELECT *
        FROM urls
        WHERE id=$1;
    `, [id]);
    return url;
}

export function getByShortUrl(shortUrl){
    const url = db.query(`
        SELECT *
        FROM urls
        WHERE "shortUrl"=$1;
    `, [shortUrl]);
    return url;
}

export function registerAccess(urlId){
    const result = db.query(`
        INSERT INTO accesses ("urlId")
        VALUES ($1);
    `, [urlId]);
    return result;
}

export function deleteUrlById(id){
    const result = db.query(`
        DELETE
        FROM urls
        WHERE id=$1
    `, [id]);
    return result;
}