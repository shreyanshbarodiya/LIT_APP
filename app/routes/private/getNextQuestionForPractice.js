var express = require('express');
var router = express.Router();

var models = require('../../models');
var seq = models.sequelize;


router.get('/getNextQuestionForPractice', function(req, res){
    var retString={};   

    var received =
      {   email: req.user.email,
          subject_name: req.query.subject_name,
          topic_name: req.query.topic_name
      };

    var queryString="SELECT * FROM question WHERE subject_name= :subject_name AND topic_name= :topic_name AND question_id NOT IN (select question_id from submission WHERE email= :email) LIMIT 1";

    seq.query(queryString,
      {
        replacements: {
          subject_name: received.subject_name,
          topic_name: received.topic_name,
          email: received.email
        }
      }).
    then(function(_quedata){
      if(_quedata[0].length==0){
        res.json({status: "false", message: "No more questions in this topic"});        
      }else{ //SUCCESS HERE
        var queData=_quedata[0][0];

        models.options.findAll({where: {question_id: queData.question_id}}).
        then(function(options){
          res.json({status: "true", message: "",
            data: {
              question: queData,
              options: options
            }
          });
        }).catch(function(err1){
          res.json({status: "false", message:err1});
        });
      }
    }).catch(function(err2){
        res.json({status: "false", message: err2});
    });
});

router.get('/getNextBatchForPractice', function(req, res){
    var retString={};   

    var received =
      {   email: req.user.email,
          subject_name: req.query.subject_name,
          topic_name: req.query.topic_name,
          batch_size: req.query.batch_size
      };
    var numQuestionsProcessed=0;
    var questions = [];

    var queryString="SELECT * FROM question WHERE subject_name= :subject_name AND topic_name= :topic_name AND question_id NOT IN (select question_id from submission WHERE email= :email) LIMIT :batch_size";

    seq.query(queryString,
      {
        replacements: {
          subject_name: received.subject_name,
          topic_name: received.topic_name,
          email: received.email,
          batch_size: parseInt(received.batch_size)
        }
      }).
    then(function(_questions){
      if(_questions[0].length==0){
        res.json({status: "false", message: "No more questions in this topic"});        
      }else{
        _questions[0].forEach(function(question){
          var que=question;
          que.options=[];
          models.options.findAll({where: {question_id: question.question_id}}).then(function(__options){
            __options.forEach(function(__option){
              que.options.push(__option.get());
            });
          }).then(function(){
            numQuestionsProcessed++;
            questions.push(que);
            if(numQuestionsProcessed==_questions[0].length){
              res.json({status: "true", message:"", data: questions});
            }
          });
        
        });
        
      }
    }).catch(function(err2){
        res.json({status: "false", message: err2});
    });
});

router.get('/getAttemptedQuestions', function(req, res){ 

    var received =
      {   email: req.user.email,
          subject_name: req.query.subject_name,
          topic_name: req.query.topic_name
      };

    var queryString="SELECT * FROM question WHERE subject_name= :subject_name AND topic_name= :topic_name AND question_id IN (select question_id from submission WHERE email= :email) LIMIT 1";

    seq.query(queryString,
      {
        replacements: {
          subject_name: received.subject_name,
          topic_name: received.topic_name,
          email: received.email
        }
      }).
    then(function(_quedata){
      if(_quedata[0].length==0){
        res.json({status: "false", message: "No attempted questions in this topic"});        
      }else{ //SUCCESS HERE
        var queData=_quedata[0][0];

        models.options.findAll({where: {question_id: queData.question_id}}).
        then(function(options){
          res.json({status: "true", message: "",
            data: {
              question: queData,
              options: options
            }
          });
        }).catch(function(err1){
          res.json({status: "false", message:err1});
        });
      }
    }).catch(function(err2){
        res.json({status: "false", message: err2});
    });
});

module.exports = router;



