/*File Name: survey.js, Student Names: Runali Patel - 301110236, Muksud Mahi - 301155894, Devanishi Patel - 301144152,
Tanisha Sharma - 300882730 , Sabah Hussein - 301161377 Date:15/07/2021 */
let mongoose = require('mongoose');

//Create a model class
/*let questionSchema = mongoose.Schema({
    question:String,
    options:Array
})*/

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
