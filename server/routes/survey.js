let express = require('express');
let router = express.Router();
let surveyController = require('../controllers/survey');

/* GET home page. */
router.get('/', surveyController.displaySurveyList);

module.exports = router;
