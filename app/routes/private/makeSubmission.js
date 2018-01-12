var express = require('express');
var router = express.Router();

var models = require('../../models');

router.post('/makeSubmission', function(req, res){
    var correctAttempted = true;

    var received =
      {   username: req.body.username,
          question_id: req.body.question_id,
          option_ids: req.body.option_id,
          timeStamp: req.body.timeStamp
      };

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

        models.submission.findOne({where: {question_id: received.question_id, username: received.username}})
        .then(function(_submission){
            if(!_submission){
                var data={
                    username: received.username,
                    question_id: received.question_id,
                    correctAttempted: correctAttempted,
                    timeStamp: received.timeStamp
                };

                models.submission.create(data).then(function(newSub, created){ //ERROR HANDLING
                    if(newSub){
                        res.redirect('/dashboard'); //PLACEHOLDERS
                    }
                });                
            }else{
                _submission.updateAttributes({correctAttempted: correctAttempted, timeStamp: received.timeStamp})
                .success(function(){
                    res.redirect('/dashboard'); //PLACEHOLDERS
                });
            }
         
        });

        //REPLY WITH PROPER STATUS AND MESSAGE
    });
    
});

module.exports = router;



