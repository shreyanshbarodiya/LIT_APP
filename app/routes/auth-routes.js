var router = require('express').Router();
var passport = require('passport');

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));


router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.json(req.user);
    // res.redirect('/dashboard');
});

module.exports = router;
