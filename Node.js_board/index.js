var express = require("express");
var path = require("path");
var session = require("express-session");
var app = express();
var port = 3000;
require('dotenv').config();

app.set("views", path.join( __dirname , "views") );
app.set("view engine",'ejs');
app.engine('ejs', require('express-ejs-extend'));

app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: process.env.session_secret,
        resave : false,
        saveUninitialized : true,
        maxAge : 36000000
    })
)

var main = require('./routes/login');
app.use('/', main);

var main = require('./routes/main');
app.use('/board', main);

var server = app.listen(port,function(){
    console.log("Express Run")
})
