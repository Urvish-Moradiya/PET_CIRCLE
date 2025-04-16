const Article = require('../models/Article');

exports.createArticle = async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json({ message: 'Article created successfully', article });
  } catch (error) {
    res.status(400).json({ message: 'Error creating article', error: error.message });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    await Article.deleteOne({ _id: id });
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error: error.message });
  }
};

