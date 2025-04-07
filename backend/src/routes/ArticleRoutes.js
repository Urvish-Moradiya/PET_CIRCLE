const express = require('express');
const router = express.Router();
const articleController = require('../controllers/ArticleController');

router.post('/articles', articleController.createArticle);
router.get('/articles', articleController.getArticles);

module.exports = router;