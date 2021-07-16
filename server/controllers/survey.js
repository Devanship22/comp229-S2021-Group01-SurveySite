let express = require("express");

//connect to our survey model
let Survey = require("../models/survey");

module.exports.displaySurveyList = (req, res, next) => {
  Survey.find((err, surveyList) => {
    if (err) {
      return console.error(err);
    } else {
      //console.log(surveyList);
      res.render("survey/list", { title: "Survey", surveyList: surveyList });
    }
  });
};
module.exports.displayAddPage = (req, res, next) => {
  res.render("survey/add", { title: "Add a Survey" });
};

module.exports.processAddPage = (req, res, next) => {
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
    answer: answer,
  });

  Survey.create(newSurvey, (err, Survey) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/survey-list");
    }
  });
};
module.exports.displayEditPage = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.id);
    return res.render("survey/edit", { title: "Survey", survey });
  } catch (error) {
    next(error);
  }
};
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
  req.session.message = {
    type: "danger",
    title: "Action failed",
    details: errorInfo,
  };
  return isValid;
}
