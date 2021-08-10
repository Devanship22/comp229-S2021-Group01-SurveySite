/*File Name: survey.js, Student Names:Runali Patel - 301110236, Muksud Hussain Mahi - 301155894, Devanshi Patel – 301161377 , 
Tanisha Sharma - 301144152, Sabah Hussein - 300882730 Date:15/07/2021 */
let mongoose = require('mongoose');

let surveyModel = mongoose.Schema({
    name: String,
    created: String,
    expiry: String,
    type: String,
    questions: String,
  //  answer: String
},
  
{
    collection:"surveys"
});

module.exports = mongoose.model('Survey', surveyModel);
