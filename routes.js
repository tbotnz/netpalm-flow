var express = require('express');
var router = express.Router();
var session = require('express-session');
// auth routes

router.get('/login', function(req, res) {
    res.render('login.html');
});

router.post('/login', function(request, response, next) {
	var apikey = request.body.apikey;
	if (apikey) {
        request.session.loggedin = true;
        console.log("logged in");
        response.redirect('/');
	} else {
        response.redirect('/login');	
    }
});

router.get('/logout', function(req, res){
    req.session.destroy(function(){
    });
    res.redirect('/login');
 });

 module.exports = router;