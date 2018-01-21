var express = require('express');
var router = express.Router();

var models = require('../../models');
var seq = models.sequelize;
var Sequelize = require("sequelize");


router.get('/getQuizQuestions', function(req, res){
  // res.json(req.query);
    var retString={};   

    var received =
      {   subject_name: req.query.subject_name,
          topic_name: req.query.topic_name,
          batch_size: parseInt(req.query.batch_size)
      };

    // var numberOfQuestions = 10;
    var _questions = [];
    var questions = [];
    var numQuestionsProcessed=0;

    models.question.findAll(
      { where: {subject_name: received.subject_name, topic_name: received.topic_name},
        limit: received.batch_size,
        order: Sequelize.fn('RAND')
      })
    .then(function (__questions) {
      __questions.forEach(function(__question){
        _questions.push(__question.get());
      });
    }).then(function(){

      _questions.forEach(function(question){
        var que=question;
        que.options=[];
        models.options.findAll({where: {question_id: question.question_id}}).then(function(__options){
          __options.forEach(function(__option){
            que.options.push(__option.get());
          });
        }).then(function(){
          numQuestionsProcessed++;
          questions.push(que);
          if(numQuestionsProcessed==_questions.length){
            retString.status="true";
            retString.message=questions;
            res.json(retString);
          }
        });
      
      });
    }).catch((err2)=>{
        retString.status="false";
        retString.message=err2;
        res.json(retString);
    });


});



module.exports = router;



