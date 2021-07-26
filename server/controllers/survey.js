/*File Name: survey.js, Student Names:Runali Patel - 301110236, Muksud Hussain Mahi - 301155894, Devanshi Patel – 301161377 , 
Tanisha Sharma - 301144152, Sabah Hussein - 300882730 Date:14/07/2021 */
let express = require("express");

//connect to our survey model
let Survey = require("../models/survey");

//Render survey list page
module.exports.displaySurveyList = async (req, res, next) => {
  try {
    const surveyList = await Survey.find();
    res.render("survey/list", { title: "Survey", surveyList: surveyList, 
    displayName: req.user ? req.user.displayName : '' });
  } catch (error) {
    next(error)
  }
};
//Renders add survey page
module.exports.displayAddPage = (req, res, next) => {
  res.render("survey/add", { title: "Add a Survey" ,
  displayName: req.user ? req.user.displayName : ''});
};
//Creates the survey
module.exports.processAddPage = async (req, res, next) => {
  try {
    const { name, type, currentdate, expirydate, questions, answer } = req.body;
    const isValidRequest = validateSurveyData(req);
    if (!isValidRequest) {
      return res.redirect("back");
    }
    let newSurvey = Survey({
      name: name,
      type: type,
      created: currentdate,
      expiry: expirydate,
      questions: questions,
     // answer: answer,
    });
  
    await Survey.create(newSurvey);
    req.session.message = {
      type: "success",
      title: "Action success",
      details: "Survey has been created successfully",
    };
    res.redirect("/survey-list");
  } catch (error) {
    next(error)
  }
};
//Renders edit survey page
module.exports.displayEditPage = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.id);
    return res.render("survey/edit", { title: "Survey", survey,
    displayName: req.user ? req.user.displayName : '' });
  } catch (error) {
    next(error);
  }
};
//Update the survey
module.exports.processEditPage = async (req, res, next) => {
  try {
    const { name, type, currentdate, expirydate, questions, answer } = req.body;
    console.log(req.body);
    const isValidRequest = validateSurveyData(req);
    if (!isValidRequest) {
      return res.redirect("back");
    }
    await Survey.findByIdAndUpdate(req.params.id, {
      $set: {
        name: name,
        type: type,
        created: currentdate,
        expiry: expirydate,
        questions: questions,
        answer: answer,
      },
    });
    req.session.message = {
      type: "success",
      title: "Action success",
      details: "Survey has been updated successfully",
    };
    res.redirect("/survey-list");
  } catch (error) {
    next(error);
  }
};

//Delete the survey
module.exports.performDelete = async (req, res, next) => {
  try {
    await Survey.findByIdAndDelete(req.params.id);
    res.redirect("/survey-list");
  } catch (error) {
    next(error);
  }
};

function validateSurveyData(req) {
  const { name, type, currentdate, expirydate, questions, answer } = req.body;
  let errorInfo = "",
    isValid = true;
  if (!name || !type || !currentdate || !expirydate || !questions) {
    errorInfo = "Missing required parameters";
    isValid = false;
  } else if (new Date(currentdate) > new Date(expirydate)) {
    errorInfo = "Expiry date can't be less than current date";
    isValid = false;
  }
  if(!isValid){
    req.session.message = {
      type: "danger",
      title: "Action failed",
      details: errorInfo,
    };
  }
  return isValid;
}
