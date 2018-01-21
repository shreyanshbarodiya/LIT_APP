var express = require('express');
var router = express.Router();

var models = require('../../models');

var retString={};   

router.get('/getAllTopics/:subject_name', function(req, res){
    models.topic.findAll({where: {subject_name: req.params.subject_name}}).then(function (topics) {
    	if(topics.length==0){
	    	retString.status="false";
	      	retString.message= "no topics for this subject";
	      	res.json(retString);
    	}else{
	    	retString.status="true";
	      	retString.message= "";
	      	retString.data= topics;
	      	res.json(retString);    		
    	}
    }).catch(function(err){
    	retString.status="false";
    	retString.message=err;
      	res.json(retString);
    });

});

router.get('/getAllTopics/', function(req, res){
    models.topic.findAll().then(function (topics) {
    	retString.status="true";
      	retString.message= "";
      	retString.data= topics;
      	res.json(retString);
    }).catch(function(err){
    	retString.status="false";
    	retString.message=err;
      	res.json(retString);
    });

});

router.get('/getAllSubjects/', function(req, res){
    models.subject.findAll().then(function (subjects) {
    	retString.status="true";
      	retString.message= "";
      	retString.data= subjects;
      	res.json(retString);
    }).catch(function(err){
    	retString.status="false";
    	retString.message=err;
      	res.json(retString);
    });

});

module.exports = router;



