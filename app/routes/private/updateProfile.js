var express = require('express');
var router = express.Router();

var models = require('../../models');
var bCrypt = require('bcrypt-nodejs');



router.get('/checkUsername/:username', function(req, res){
    models.student.count({where: {username: req.params.username}}).
    then((count)=>{
        if(parseInt(count)!=0){
            res.json({status: "true", message:req.params.username, data: false});
        }else{
            res.json({status: "true", message:req.params.username , data: true});
        }
    });
});


router.post('/updateProfile', function(req, res){
    if(req.isAuthenticated()){
        res.json({status: "false", message:"Not signed in"});
    }else{
        var received={
            email: req.body.email, //change to req.user.email
            username: req.body.username,
            name: req.body.name,
            password: bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(8), null),
            class: req.body.class,
            school: req.body.school,
            ph_no: req.body.ph_no,
            area_pincode: req.body.area_pincode,
            math_teacher: req.body.math_teacher,
            phy_teacher: req.body.phy_teacher,
            chem_teacher: req.body.chem_teacher,
            bio_teacher: req.body.bio_teacher,
        };
        
        models.student.findOne({where: {email: received.email}}).
        then((_student)=>{
            if(!_student){
                res.json({status: "false", message:"Invalid email"});
            }else{
                _student.updateAttributes({
                    username: received.username,
                    name: received.name,
                    password: received.password,
                    class: received.class,
                    school: received.school,
                    ph_no: received.ph_no,
                    area_pincode: received.area_pincode,
                    math_teacher: received.math_teacher,
                    phy_teacher: received.phy_teacher,
                    bio_teacher: received.bio_teacher,
                    chem_teacher: received.chem_teacher
                }).
                then(()=>{
                    res.json({status: "true"});
                });
            }
        }).
        catch((err)=>{res.json({status: "false", message:err})});

    }
});

router.get('/getProfile', (req, res)=>{
    if(req.isAuthenticated()){
        res.json({status: "true", data: req.user});
    }else{
        res.json({status: "false", message: "Not signed in"});
    }
});

module.exports = router;



