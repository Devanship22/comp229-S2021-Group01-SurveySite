/*File Name: index.js, Student Names: Runali Patel - 301110236, Muksud Mahi - 301155894, Devanishi Patel - 301144152,
Tanisha Sharma - 300882730 , Sabah Hussein - 301161377 Date:14/07/2021 */
let express = require('express');
let router = express.Router();
let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);
/* GET home page. */
router.get('/home', indexController.displayHomePage);


module.exports = router;
