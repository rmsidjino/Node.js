var express = require("express");
var app = express();

app.set("views", __dirname + "/views");
app.set('view engine','ejs');

app.use(express.json()); 
app.use(express.urlencoded({ extended : false}));

var main = require('./routes/main')();
app.use('/', main);

app.use(express.static('public/css'));

var server = app.listen(5000,function(){
    console.log("Express Run")
})