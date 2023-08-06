import { db } from "../database/database.connection.js";

export async function insertUrl(url, userId, shortUrl) {
    const result = await db.query(`
            INSERT INTO urls (url, "userId", "shortUrl")
            VALUES ($1, $2, $3)
            RETURNING id;
        `, [url, userId, shortUrl]);
    return result;
};

export async function getUrl(id){
    const url = await db.query(`
        SELECT *
        FROM urls
        WHERE id=$1;
    `, [id]);
    return url;
}

export async function getByShortUrl(shortUrl){
    const url = await db.query(`
        SELECT *
        FROM urls
        WHERE "shortUrl"=$1;
    `, [shortUrl]);
    return url;
}

export async function registerAccess(urlId){
        await db.query(`
        INSERT INTO accesses ("urlId")
        VALUES ($1);
    `, [urlId]);
}

export async function deleteUrlById(id){
        await db.query(`
        DELETE
        FROM urls
        WHERE id=$1
    `, [id]);
}