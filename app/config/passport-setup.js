var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
// var keys = require('./keys');
var config = require('./config.json');
var student = require('../models/student');
var models = require('../models');

passport.serializeUser(function(student, done) {
    done(null, student.email);
});

passport.deserializeUser(function(email, done) {
    models.student.findOne({where: {email: email}}).
    then((_student)=>{
        done(null, _student);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: config["google"].clientID,
        clientSecret: config["google"].clientSecret,
        callbackURL: config["google"].callbackURL
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile.emails[0].value);

        models.student.findOne({where: {email: profile.emails[0].value}}).then((currentUser) => {
            if(currentUser){
                done(null, currentUser);
            } else {
                var data =
                  {   username:profile.id,
                      name: profile.displayName,
                      email:profile.emails[0].value,
                      google_id: profile.id
                  };

                models.student.create(data).then(function(newUser,created){
                    done(null,newUser); 
                });           
            }
        });
    })
);