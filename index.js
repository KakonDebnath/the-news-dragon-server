const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

const categories = require("./data/categories.json");
const news = require("./data/news.json");

// for cors policy only
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// get categories name form server
app.get("/categories", (req, res) => {
    res.send(categories);
});
// get all news
app.get("/news", (req, res) => {
    res.send(news);
});
// get individual news by id
app.get("/news/:id", (req, res) => {
    const id = req.params.id;
    const selectedNews = news.find(news => news._id === id);
    res.send(selectedNews);
});
// get individual category news
app.get("/categories/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (id === 0) {
        res.send(news);
    } else {
        const categoryNews = news.filter(cNews => parseInt(cNews.category_id) === id);
        res.send(categoryNews);
    }
});
// for own testing purposes
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});