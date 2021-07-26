/*File Name: survey.js,Student Names:Runali Patel - 301110236, Muksud Hussain Mahi - 301155894, Devanshi Patel – 301161377 , 
Tanisha Sharma - 301144152, Sabah Hussein - 300882730 Date:15/07/2021 */
let express = require('express');
let router = express.Router();
let surveyController = require('../controllers/survey');

/* GET home page. */
router.get('/', surveyController.displaySurveyList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', surveyController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', surveyController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', surveyController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', surveyController.processEditPage);

/* GET to perform Deletion - DELETE Operation */
router.get('/delete/:id',  surveyController.performDelete);
module.exports = router;
