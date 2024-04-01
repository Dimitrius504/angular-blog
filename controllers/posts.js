const express = require('express');
const router = express.Router();
const Post = require('../models/post');

/* GET: /api/posts => show all posts */
router.get('/', async (req, res, next) => {
    try {
        // use model to get all docs newest to oldest
        let posts = await Post.find().sort({ 'date': -1 });

        return res.json(posts).status(200); // 200: OK
    }
    catch (err) {
        return res.json(err).status(400); // 400: Bad Request
    }        
});

/* POST: /api/posts => create new post from http request body */
router.post('/', async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        return res.json(post).status(201); // 201: Resource Created
    }
    catch(err) {
        return res.json(err).status(400); // 400: Bad Request
    }
});

/* DELETE: /api/posts/abc123 => delete selected post */
router.delete('/:id', async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params._id);
        return res.json({}).status(204); // 204: no content
    } catch(err) {
        return res.json(err).status(404);   // 404: not found
    }
});

/* PUT: /api/posts/abc123 => update selected post */
router.put('/:id', async (req, res, next) => {
    try {
        let post = await Post.findByIdAndUpdate(req.params._id, req.body);
        return res.json(post).status(202); // 202: resource modified
    } catch (err){
        return res.json(err).status(404);   // 404: not found
    }
});
module.exports = router;