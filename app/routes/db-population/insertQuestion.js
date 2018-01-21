var express = require('express');
var router = express.Router();

var models = require('../../models');

router.get('/insertQuestion/:subject_name', function(req, res){
    var subjects = [];
    var topics = [];

    subjects.push( {subject_name: req.params.subject_name});

    models.topic.findAll({where: {subject_name: req.params.subject_name}}).then(function (_topics) {
      _topics.forEach(function(topic){
        topics.push(topic.get());
      })})
      .then(function(){
      res.render('insertQuestion', {subject_list: subjects, topic_list: topics});
    });
});

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
    
    console.log('files: ' + req.files);
    console.log('req: ' + JSON.stringify(req.body));
    
    var corrects = req.body.correct;
    console.log('corrects: ' + corrects);
    console.log('options: ' + req.body.options);


    var data =
      {   question_text: req.body.question_text,
          topic_name: req.body.topic_name,
          subject_name: req.body.subject_name,
          question_marks :req.body.question_marks,
          contains_image: 0,
          image_url: ""
      };

    if(req.files.uploaded_image){
      var file = req.files.uploaded_image;
      var img_name=file.name;
                   
      file.mv('public/images/questions/'+file.name, function(err) {     
        if (err){
          console.log('ERROR in images: ' + err);
          return res.status(500).send(err);
        }


      });
      data.contains_image=1;
      data.image_url= img_name;
      
    }

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
          var option_images = [].concat(req.files.option_images);
          var termsCheck = req.body.termsChkbx;


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

              if(termsCheck != undefined && termsCheck.includes((i+1).toString())){
                var idx = termsCheck.indexOf((i+1).toString());
                var file = option_images[idx];
                var img_name=file.name;
                             
                file.mv('public/images/options/'+file.name, function(err) {     
                  if (err){
                    console.log('ERROR in images: ' + err);
                    return res.status(500).send(err);
                  }

                });

                result.contains_image = 1;
                result.image_url = img_name;
              }
              results.push(result);
          }

           models.options.bulkCreate(results, {fields: ['option_id', 'question_id',
              'option_text', 'is_correct', 'contains_image', 'image_url']}).then(function(response){
                // console.log(response);
              }).catch(function(error){
                // console.log(error);
              });

          // console.log(results);
          //redirecting to the same subject that was inserted
          res.redirect('insertQuestion/'+data.subject_name);
      });
      
    


    
});



module.exports = router;



