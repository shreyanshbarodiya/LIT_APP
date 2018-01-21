var express = require('express');
var router = express.Router();

var models = require('../../models');
var seq = models.sequelize;


router.get('/statistics', function(req, res){
    if(!req.isAuthenticated()){
        res.json({status: "false", message: "not signed in"});
    }else{
        var qString = "SELECT username, email, name, overall_score, today_score, "+
        "FIND_IN_SET( overall_score, "+
        "(SELECT GROUP_CONCAT( overall_score ORDER BY overall_score DESC) FROM student )) AS overall_rank, "+
        "FIND_IN_SET( today_score, "+
        "(SELECT GROUP_CONCAT( today_score ORDER BY today_score DESC) FROM student )) AS today_rank "+  
        "FROM student WHERE email=:email;";
        seq.query(qString, {
          replacements:{
            email: req.user.email
          }
        }).then((_data)=>{
          res.json({
            status: "true",
            message: _data[0][0]
          });
        }).catch((err)=>{
          res.json({
            status: "false",
            message: err
          });
        });
    }
});

router.get('/statistics/:subject_name', function(req, res){
    if(!req.isAuthenticated()){
        res.json({status: "false", message: "not signed in"});
    }else{
        var qString = "SELECT email, sum(question_marks) as subject_marks FROM submission JOIN question ON submission.question_id=question.question_id WHERE subject_name=:subject_name AND email=:email";

        seq.query(qString,{
            replacements: {
                subject_name: req.params.subject_name,
                email: req.user.email
            }
        }).then((_data)=>{
            if(_data[0][0].email==null){
                res.json({ status: "true", message: {email: req.user.email, subject_marks: 0}});
            }else{
                res.json({ status: "true", message: _data[0][0]});                
            }
        }).catch((err)=>{
            res.json({ status: "false", message: err });
        });
    }
});

module.exports = router;



