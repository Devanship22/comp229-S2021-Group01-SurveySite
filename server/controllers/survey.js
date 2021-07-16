let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our survey model
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
module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', {title: 'Add a Survey'})          
}

module.exports.processAddPage = (req, res, next) => {
  
    let newSurvey = Survey({
        "name": req.body.name,
        "type": req.body.type,
        "created": req.body.currentdate,
        "expiry": req.body.expirydate,
        "questions": req.body.questions,
        "answer":req.body.answer
          
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/survey-list');
        }
    });

}
