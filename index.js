var express    = require('express')
var app        = express()
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var env        = require('dotenv').load()
var exphbs     = require('express-handlebars')
var fileUpload = require('express-fileupload');

var passportSetup = require('./app/config/passport-setup');


//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


 // For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(fileUpload());
app.use(express.static('public'));
app.use('/images', express.static(__dirname + 'public/images'));

app.set('views', './app/views')
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


app.get('/', function(req, res){
  res.send('Welcome to Passport with Sequelize');
});

app.get('/dashboard', function(req,res){
    if (req.isAuthenticated()){
		res.render('dashboard', {firstname: req.user.name, lastname: req.user.school}); 
    }
    else{
    	res.redirect('/auth/google');
    }
	
});

//Models
var models = require("./app/models");

/*var authRoute = require('./app/routes/auth.js')(app,passport);

require('./app/config/passport/passport.js')(passport,models.student);*/

var authRoutes = require('./app/routes/auth-routes');
app.use('/auth', authRoutes);


//Sync Database
models.sequelize.sync().then(function(){
    console.log('Nice! Database looks fine')
}).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
});


/***
**** FOR DB-POPULATION
***/

//Add questions portal
var insertQuestionRoute = require('./app/routes/db-population/insertQuestion');
app.use(insertQuestionRoute);

//Display all questions portal
var displayAllQuestions = require('./app/routes/db-population/displayAllQuestions');
app.use(displayAllQuestions);

//Display latest questions portal
var displayLatestQuestions = require('./app/routes/db-population/displayLatestQuestions');
app.use(displayLatestQuestions);

/***
**** PRIVATE ROUTES
***/

//List all topics
var getAllTopicsAndSubjects = require('./app/routes/private/getAllTopicsAndSubjects');
app.use(getAllTopicsAndSubjects);

//List all teachers
var getTeachers = require('./app/routes/private/getTeachers');
app.use(getTeachers);

//Make submission
var makeSubmission = require('./app/routes/private/makeSubmission');
app.use(makeSubmission);

//get next question for practice
var getNextQuestionForPractice = require('./app/routes/private/getNextQuestionForPractice');
app.use(getNextQuestionForPractice);

//get N questions for quiz
var getQuizQuestions = require('./app/routes/private/getQuizQuestions');
app.use(getQuizQuestions);

var updateProfile = require('./app/routes/private/updateProfile');
app.use(updateProfile);
/***
**** STATISTICS
***/
var statistics = require('./app/routes/private/statistics');
app.use(statistics);


app.listen(5000, function(err){
	if(!err)
	console.log("Site is live"); else console.log(err)

});




