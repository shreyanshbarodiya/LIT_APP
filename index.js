var express    = require('express')
var app        = express()
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var env        = require('dotenv').load()
var exphbs     = require('express-handlebars')
var fileUpload = require('express-fileupload');



//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


 // For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// For uploading images 
app.use(fileUpload());

//displaying images
app.use(express.static('public'));
//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(__dirname + 'public/images'));

 //For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


app.get('/', function(req, res){
  res.send('Welcome to Passport with Sequelize');
});



//Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/auth.js')(app,passport);


//load passport strategies
require('./app/config/passport/passport.js')(passport,models.student);


//Sync Database
models.sequelize.sync().then(function(){
    console.log('Nice! Database looks fine')
}).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
});



//FOR INTERNAL USE

//ADD questions portal
var insertQuestionRoute = require('./app/routes/insertQuestion');
app.use(insertQuestionRoute);

//Display all questions portal
var displayAllQuestions = require('./app/routes/displayAllQuestions');
app.use(displayAllQuestions);

app.listen(5000, function(err){
	if(!err)
	console.log("Site is live"); else console.log(err)

});




