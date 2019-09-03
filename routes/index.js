const express = require('express');
const router = express.Router();
const postsRouter = require('./postsRouter');

router.use('/posts', postsRouter);

module.exports = router;


