let express = require('express');
let router = express.Router();
let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);
/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET login page */


/* POST route to process login*/


/* GET register page */


/* POST route for processing user registration */


/* GET to perform user logout */


module.exports = router;
