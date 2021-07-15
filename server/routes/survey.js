let express = require('express');
let router = express.Router();
let surveyController = require('../controllers/survey');

/* GET home page. */
router.get('/', surveyController.displaySurveyList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', surveyController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', surveyController.processAddPage);
module.exports = router;
