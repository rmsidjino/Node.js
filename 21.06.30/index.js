v
ar express = require("express");
var path = require("path");
var app = express();
var port = 3000;

app.set("views",path.join( __dirname , "views") );
app.set("view engine",'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended : false}));

app.get('/',function(req, res){
    res.render('index');
})

app.get('/second',function(req, res){
    res.render('second');
})

app.get('/third',function(req, res){
    res.render('third');
})


var server = app.listen(port);