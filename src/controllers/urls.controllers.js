import { nanoid } from 'nanoid';
import { deleteUrlById, getByShortUrl, getUrl, insertUrl, registerAccess } from '../repository/urls.repository.js';

export async function postUrl(req, res){
    try{
        const { url } = req.body;
        if (!url)
            return res.status(422).send("Invalid Url!");
        const shortUrl = nanoid();
        const result = await insertUrl(url, res.locals.session.userId, shortUrl);
        res.status(201).send({id: result.rows[0].id, shortUrl: shortUrl});
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function getUrlById(req, res){
    const { id } = req.params; 
    try{
        const url = await getUrl(id);
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
        const url = await getByShortUrl(shortUrl);
        if (url.rows.length === 0)
            return res.sendStatus(404);
        await registerAccess(url.rows[0].id);
        res.redirect(`${url.rows[0].url}/`);
    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res){
    const { id } = req.params;
    try{
        const url = await getUrl(id);
        if (url.rows.length === 0) return res.sendStatus(404);
        if (res.locals.session.userId !== url.rows[0].userId)
            return res.sendStatus(401);
        await deleteUrlById(id);
        res.sendStatus(204);
    }catch (err){
        res.status(500).send(err.message);
    }
}