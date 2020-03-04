var express = require('express');
var path = require('path');

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = function (app) {
    app.get('/survey', function (req, res, next) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    /* GET home page. W catch-all route */
    app.get('/*', function (req, res, next) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}