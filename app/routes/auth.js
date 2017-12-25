
module.exports = function(app,passport){

	app.get('/signup', function(req,res){
			res.render('signup'); 
	});

	app.get('/signin', function(req,res){
		res.render('signin'); 
	});
	
	app.get('/dashboard',isLoggedIn, function(req,res){
	    if (req.isAuthenticated()){
			res.render('dashboard', {firstname: req.user.name, lastname: req.user.school}); 
	    }
	    else{
	    	res.redirect('signin');
	    }
		
	});
	
	app.get('/logout', function(req,res){
		req.session.destroy(function(err) {
			res.redirect('/');
		});
	});
	
	app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/dashboard',
	                                                    failureRedirect: '/signup'}
	                                                    ));


	app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/dashboard',
	                                                    failureRedirect: '/signin'}
	                                                    ));


	function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated())
	        return next();

	    res.redirect('/signin');
	}


}






