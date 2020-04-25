var http = require('http');
var express = require("express");
var RED = require("node-red");
var nunjucks = require('nunjucks');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

nunjucks.configure('views',{
    autoescape:true,
    express:app
});

app.use("/",express.static("public"));
app.use(session({
	secret: '33333333333333Aeqe@#213213Zxczxcaweq@',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var util = require('./routes.js');

app.use('/', util);

function checkSession(req, res, next){
    if(req.session.loggedin){
        next();
    } else {
        var err = new Error("Not logged in!");
        next(err);
    }
 }

app.get('/', checkSession, function(req, res) {
    res.render('nav.html');
});

app.get('/home', checkSession, function(req, res, next) {
    res.render('home.html');
});

app.get('/nav', checkSession, function(req, res) {
    res.render('nav.html');
});

app.get('/flows', checkSession, function(req, res) {
    res.render('flows.html');
});

app.get('/table', function(req, res) {
    res.render('table.html');
});

var server = http.createServer(app);

var settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    userDir:"/home/nol/.nodered/",
    functionGlobalContext: { } 
};

app.get('*', checkSession, function(req, res, next) {
    next();
});

app.use('*', function(err, req, res, next){
    if (err){
        res.redirect('/login');
    } else {
        res.redirect('/home');
    }
});


RED.init(server,settings);
app.use(settings.httpAdminRoot,RED.httpAdmin);
app.use(settings.httpNodeRoot,RED.httpNode);


server.listen(80);
RED.start();