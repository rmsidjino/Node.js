var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : 'localhost', //127.0.0.1
    port     : 3306,
    user     : 'root',
    password : '1234',
    database : 'test'
  });

router.get("/add_article", function(req, res, next){
    res.render("add_article");
})

router.post('/add_article2',function(req, res){
    var No =req.body.No;
    var title =req.body.title;
    var content =req.body.content;
    console.log(No, title, content);
    connection.query(
        `insert into board (No, title, content) values (?, ?, ?)`,
            [No, title, content]);
    res.redirect("/");
})

router.get("/", function(req, res){
    connection.query(
        `select * from board`,
        function(err,result){
            console.log(result);
            if(err){
                console.log(err);
                res.send("board connection Error");
            }else{
                res.render("article_list", {article : result});
            }
        }
    )
})

router.get("/detail", function(req, res){
    var No = req.query.No;
    console.log(No);
    connection.query(
        `select * from board where No = ?`,
        [No],
        function(err,result){
            if(err){
                console.log(err);
                res.send("board connection Error");
            }else{
                res.render("search", {article : result});
            }
        }
    )
})

module.exports=router;