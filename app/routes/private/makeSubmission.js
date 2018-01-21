var express = require('express');
var router = express.Router();

var models = require('../../models');
var Sequelize = require("sequelize");
var seq = models.sequelize;
    
var retString={};   

router.post('/makeSubmission', function(req, res){
    var correctAttempted = true;

    var received =
      {   email: req.body.email ,
          question_id: req.body.question_id,
          option_ids: req.body.option_id,
          timeStamp: req.body.timeStamp
      };

    var question_marks;
    models.question.findOne({where: {question_id: received.question_id}})
    .then((_found_question)=>{
        question_marks=_found_question.question_marks;
    });

    models.options.findAll({where: {question_id: received.question_id, is_correct: 1}, attributes: ['option_id']})
    .then(function (correct_options) {
        if(correct_options.length != received.option_ids.length){
            correctAttempted=false;
        }else{
            correct_options.forEach(function(corr_opt){
                if(!received.option_ids.includes(corr_opt.option_id.toString())){
                    correctAttempted=false;
                }
            });        
        }

        models.submission.findOne({where: {question_id: received.question_id, email: received.email}})
        .then(function(_submission){
            if(!_submission){
                var data={
                    email: received.email,
                    question_id: received.question_id,
                    correctAttempted: correctAttempted,
                    timeStamp: received.timeStamp
                };

                models.submission.create(data).then(function(newSub, created){

                    if(correctAttempted){
                        var qString = "UPDATE student SET overall_score=overall_score+ :question_marks, today_score=today_score+ :question_marks WHERE email=:email";

                        seq.query(qString, {
                            replacements: {
                                email: received.email,
                                question_marks: question_marks
                            }
                        }).then(()=>{
                            res.json({status: "true", message: correctAttempted});
                        }).catch((err)=>{res.json({status: "false", message: err});});

                    }else{
                        res.json(retString);                    
                    }

                }).catch(function(err){
                    retString.status = "false";
                    retString.message = "CANNOT CREATE SUBMISSION: \n"+err;
                    res.json(retString);
                });          
            }else{
                var earlierAttempt=_submission.get().correctAttempted;
                if(earlierAttempt==1 && correctAttempted==0){ // EARLIER CORRECT, NOW INCORRECT 
                    _submission.updateAttributes({correctAttempted: correctAttempted, timeStamp: received.timeStamp})
                    .then(function(){
                        var qString = "UPDATE student SET overall_score=overall_score- :question_marks, today_score=today_score- :question_marks WHERE email=:email";

                        seq.query(qString, {
                            replacements: {
                                email: received.email,
                                question_marks: question_marks
                            }
                        }).then(()=>{
                            res.json({status: "true", message: correctAttempted});
                        }).catch((err)=>{res.json({status: "false", message: err});});
                    })
                    .catch(function(err){
                        res.json({status: "false", message: "CANNOT UPDATE PREVIOUS SUBMISSION: \n" + err});                    
                    });

                }else if(earlierAttempt==0 && correctAttempted==1){
                    _submission.updateAttributes({correctAttempted: correctAttempted, timeStamp: received.timeStamp})
                    .then(function(){
                        //increase overall score
                        var qString = "UPDATE student SET overall_score=overall_score+ :question_marks, today_score=today_score+ :question_marks WHERE email=:email";

                        seq.query(qString, {
                            replacements: {
                                email: received.email,
                                question_marks: question_marks
                            }
                        }).then(()=>{
                            res.json({status: "true", message: correctAttempted});
                        }).catch((err)=>{res.json({status: "false", message: err});});
                    })
                    .catch(function(err){
                        res.json({status: "false", message: "CANNOT UPDATE PREVIOUS SUBMISSION: \n" + err});                    
                    });
                }else{
                    res.json({status: "true", message:true});
                }

            } 
        }).catch(function(err){
            res.json({status: "false", message: "CANNOT FIND EXISTING SUBMISSION: \n" + err});
        });

    }).catch(function(err){
            res.json({status: "false", message: "CANNOT FIND OPTIONS: \n" + err});
    });
});

/*Require request in the following JSON form:
[
    {
        "question_id":1,
        "option_id": [1,2],
        "timeStamp": "2018-01-19 17:27:30"
        
    },
    {
        "question_id": 2,
        "option_id":[1,3],
        "timeStamp": "2018-01-20 17:27:30"
        
    }
]

header: application/json
An array of json objects containing question ids and attempted options and timestamps.
*/
router.post('/makeBatchSubmission', function(req, res){
    var attemptedData = req.body;
    var processedQue=0;
    attemptedData.forEach((attemptedQuestion)=>{

        var correctAttempted = true;
        var received =
          {   email: req.user.email,
              question_id: attemptedQuestion.question_id,
              option_ids: attemptedQuestion.option_id,
              timeStamp: attemptedQuestion.timeStamp
          };

        var question_marks;
        models.question.findOne({where: {question_id: received.question_id}})
        .then((_found_question)=>{
            question_marks=_found_question.question_marks;
        });

        models.options.findAll({where: {question_id: received.question_id, is_correct: 1}, attributes: ['option_id']})
        .then(function (correct_options) {
            if(correct_options.length != received.option_ids.length){
                correctAttempted=false;
            }else{
                correct_options.forEach(function(corr_opt){
                    if(!received.option_ids.includes(corr_opt.option_id)){
                        correctAttempted=false;
                    }
                });        
            }

            models.submission.findOne({where: {question_id: received.question_id, email: received.email}})
            .then(function(_submission){
                if(!_submission){
                    var data={
                        email: received.email,
                        question_id: received.question_id,
                        correctAttempted: correctAttempted,
                        timeStamp: received.timeStamp
                    };

                    models.submission.create(data).then(function(newSub, created){
                        if(correctAttempted){
                            var qString = "UPDATE student SET overall_score=overall_score+ :question_marks, today_score=today_score+ :question_marks WHERE email=:email";

                            seq.query(qString, {
                                replacements: {
                                    email: received.email,
                                    question_marks: question_marks
                                }
                            });
                        }

                    });     
                }else{
                    var earlierAttempt=_submission.get().correctAttempted;
                    if(earlierAttempt==1 && correctAttempted==0){
                        _submission.updateAttributes({correctAttempted: correctAttempted, timeStamp: received.timeStamp})
                        .then(function(){
                            var qString = "UPDATE student SET overall_score=overall_score- :question_marks, today_score=today_score- :question_marks WHERE email=:email";

                            seq.query(qString, {
                                replacements: {
                                    email: received.email,
                                    question_marks: question_marks
                                }
                            });
                        });
                    }else if(earlierAttempt==0 && correctAttempted==1){
                        _submission.updateAttributes({correctAttempted: correctAttempted, timeStamp: received.timeStamp})
                        .then(function(){
                            var qString = "UPDATE student SET overall_score=overall_score+ :question_marks, today_score=today_score+ :question_marks WHERE email=:email";

                            seq.query(qString, {
                                replacements: {
                                    email: received.email,
                                    question_marks: question_marks
                                }
                            });
                        });
                    }
                } 
            });
        }).then(()=>{
            processedQue++;
            if(processedQue==attemptedData.length){
                res.json({status: "true"});
            }              
        }).catch((err)=>{
            res.json({status: "false", message: err});
        });

    });
});

module.exports = router;



