var express = require('express');
var router = express.Router();

var models = require('../../models');

router.get('/getAllTopics/:subject_name', function(req, res){
    models.topic.findAll({where: {subject_name: req.params.subject_name}}).then(function (topics) {
      res.end(JSON.stringify(topics));
    });

});

router.get('/getAllTopics/', function(req, res){
    models.topic.findAll().then(function (topics) {
      res.end(JSON.stringify(topics));
    });

});

module.exports = router;



