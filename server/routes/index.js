/*File Name: index.js, Student Names:Runali Patel - 301110236, Muksud Hussain Mahi - 301155894, Devanshi Patel – 301161377 , 
Tanisha Sharma - 301144152, Sabah Hussein - 300882730 Date:14/07/2021 */
let express = require('express');
let router = express.Router();
let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);
/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET login page */
router.get('/login', indexController.displayLoginPage);

/* POST route to process login*/
router.post('/login', indexController.processLoginPage);

/* GET register page */
router.get('/register', indexController.displayRegisterPage);

/* POST route for processing user registration */
router.post('/register', indexController.processRegisterPage);

/* GET to perform user logout */
router.get('/logout', indexController.performLogout);

module.exports = router;
