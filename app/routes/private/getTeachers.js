var express = require('express');
var router = express.Router();

var models = require('../../models');

var retString={};   

router.get('/getTeachers/:pincode', function(req, res){
    models.teacher.findAll({where: {area_pincode: req.params.pincode}}).then(function (teachers) {
        if(teachers.length==0){
           res.json({status: "true", message: "No teachers", data: {}});
        }else{
            res.json({
                status: "true",
                message: "",
                data: teachers
            });         
        }
    }).catch(function(err){
        res.json({status: "false", message: err});
    });

});


router.get('/getTeachers', function(req, res){
    models.teacher.findAll().then(function (teachers) {
    	if(teachers.length==0){
    	   res.json({status: "true", message: "No teachers", data: {}});
    	}else{
	      	res.json({
                status: "true",
                message: "",
                data: teachers
            });    		
    	}
    }).catch(function(err){
      	res.json({status: "false", message: err});
    });

});


module.exports = router;



