/*File Name:  index.js, Student Names: Runali Patel - 301110236, Muksud Mahi - 301155894, Devanishi Patel - 301144152,
Tanisha Sharma - 300882730 , Sabah Hussein - 301161377 Date:14/07/2021 */
let express = require('express');
let router = express.Router();

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Survey Site' });
}