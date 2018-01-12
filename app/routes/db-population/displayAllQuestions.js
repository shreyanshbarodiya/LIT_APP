var express = require('express');
var router = express.Router();

var models = require('../../models');

router.get('/displayAllQuestions', function(req, res){
    var _questions = [];
    var questions = [];

    models.question.findAll().then(function (__questions) {
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
          
          questions.push(que);
        });
      
      });
      

    }).then(function(){
      res.render('displayAllQuestions', {question_list: questions});
    });

});





module.exports = router;



