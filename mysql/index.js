var express = require("express");
var path = require("path");
var app = express();
var port = 3000;

app.set("views", path.join( __dirname , "views") );
app.set("view engine",'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

var main = require('./routes/main');
app.use('/', main);

var server = app.listen(port,function(){
    console.log("Express Run")
})