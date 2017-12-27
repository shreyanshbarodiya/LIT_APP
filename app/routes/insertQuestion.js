var express = require('express');
var router = express.Router();

var models = require('../models');
router.get('/insertQuestion', function(req, res){
    var subjects = [];
    var topics = [];

    models.subject.findAll().then(function (_subjects) {
      _subjects.forEach(function(subject){
        subjects.push(subject.get());
      });
    }).then(function(){
      models.topic.findAll().then(function (_topics) {
        _topics.forEach(function(topic){
          topics.push(topic.get());
        });
      });
    }).then(function(){
      
      res.render('insertQuestion', {subject_list: subjects, topic_list: topics});
    });


});

router.post('/insertQuestion', function(req, res){
    var corrects = req.body.correct;
    console.log(corrects);
    var data =
      {   question_text: req.body.question_text,
          topic_name: req.body.topic_name,
          subject_name: req.body.subject_name,
          question_marks :req.body.question_marks,
          contains_image: 0,
          image_url: ""
      };

    var question_id;
    models.question.create(data).then(function(newquestion,created){
      if(!newquestion){
        console.log('\n \n FAILED!!! \n \n ');
        console.log(data);
      }
      if(newquestion){
        console.log('\n \n SUCCESS!!! \n \n ');
        question_id = newquestion.get().question_id;
      }
    }).then(function(){
        var results=[];
        var options = req.body.options;
        var corrects = req.body.correct;

        for (var i = 0; i < options.length; i++) {
            var _corr=0;
            if(corrects.includes((i+1).toString())){
              _corr=1;
            }
            var result={
              option_id : i+1,
              question_id : question_id,
              option_text : options[i],
              is_correct : _corr,
              contains_image : 0,
              image_url : ""
            };
            results.push(result);
        }

         models.options.bulkCreate(results, {fields: ['option_id', 'question_id',
            'option_text', 'is_correct', 'contains_image', 'image_url']}).then(function(response){
              // console.log(response);
            }).catch(function(error){
              // console.log(error);
            });

        // console.log(results);
        res.redirect('insertQuestion');

    });
});

module.exports = router;



