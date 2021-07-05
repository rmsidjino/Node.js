var express = require("express");
var app = express();

app.set("view")
var server = app.listen(3000, function(){
    console.log("Express Run");
});

app.get("/", function(req,res){
    res.send("Hello world")
});

app.get("/second", function(req,res){
    res.send("Second page")
});