let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our book model
let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(surveyList);
            res.render('survey/list', {title: 'Survey', surveyList: surveyList});
        }
    });
}