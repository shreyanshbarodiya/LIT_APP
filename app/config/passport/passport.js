
  //load bcrypt
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport,student){

    var Student = student;
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(student, done) {
        done(null, student);
    });

    passport.deserializeUser(function(student, done) {
        done(null, student);
    });


    passport.use('local-signup', new LocalStrategy(

      {           
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
      },

      function(req, _username, password, done){
        var generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        Student.findOne({where: {username:_username}}).then(function(student){
          if(student){
            console.log('\n \n That email is already taken \n \n ');
            return done(null, false, {message : 'That email is already taken'} );
          }else{
            var userPassword = generateHash(password);
            var data =
              {   username:_username,
                  name: req.body.name,
                  password:userPassword,
                  email:req.body.email,
                  ph_no:req.body.ph_no,
                  school: req.body.school,
                  class: req.body.class,
                  area_pincode: req.body.area_pincode,
                  math_teacher: req.body.math_teacher,
                  bio_teacher: req.body.bio_teacher,
                  phy_teacher: req.body.phy_teacher,
                  chem_teacher: req.body.chem_teacher
              };

            Student.create(data).then(function(newUser,created){
              if(!newUser){
                console.log('\n \n FAILED!!! \n \n ');
                console.log(data);
                return done(null,false);
              }
              if(newUser){
                return done(null,newUser); 
              }
            });
          }
        }); 
      }
    ));
      
    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
      {// by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
      },

      function(req, _username, password, done) {

        var Student = student;

        var isValidPassword = function(userpass,password){
          return bCrypt.compareSync(password, userpass);
        }

        Student.findOne({ where : { username: _username}}).then(function (student) {
          if (!student) {
            console.log('NO such username');
            return done(null, false, { message: 'Email does not exist' });
          }

          if (!isValidPassword(student.password,password)) {
            console.log('INCORRECT password');
            return done(null, false, { message: 'Incorrect password.' });
          }

          var userinfo = student.get();
          return done(null,userinfo);
          
        }).catch(function(err){
          console.log("Error:",err);
          return done(null, false, { message: 'Something went wrong with your Signin' });
        });
      }
    ));

}

