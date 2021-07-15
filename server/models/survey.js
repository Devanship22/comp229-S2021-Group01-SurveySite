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
},
{
    collection:"surveys"
});

module.exports = mongoose.model('Survey', surveyModel);
