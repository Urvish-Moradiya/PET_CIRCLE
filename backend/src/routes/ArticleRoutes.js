const express = require('express');
const router = express.Router();
const articleController = require('../controllers/ArticleController');

router.post('/articles', articleController.createArticle);
router.get('/articles', articleController.getArticles);
router.delete('/articles/:id', articleController.deleteArticle);

module.exports = router;