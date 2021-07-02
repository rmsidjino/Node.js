var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var moment = require('moment');

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
    var image =req.body.image;
    var today = moment().format('YYYY-MM-DD');
    console.log(No, title, content);
    connection.query(
        `insert into board (No, title, content,image, today) values (?, ?, ?, ?, ?)`,
            [No, title, content, image, today]);
    res.redirect("/");
})

router.get("/", function(req, res){
    connection.query(
        `select * from board`,
        function(err,result){
            console.log(result.length);
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

router.get('/delete',function(req, res){
    var No =req.query.No;
    console.log(No)
    connection.query(
        `delete from board where No = ?`,
        [No],
        function(err,result){
            if(err){
                console.log(err);
                res.send("board connection Error");
            }else{
                res.redirect("/");
            }
        }
    )
})

router.get('/edit',function(req, res){
    var No =req.query.No;
    console.log(No)
    connection.query(
        `select * from board where No = ?`,
        [No],
        function(err,result){
            if(err){
                console.log(err);
                res.send("board connection Error");
            }else{
                res.render("edit",{article : result})
            }
        }
    )
})

router.post('/edit/:No',function(req, res){
    console.log("edit");
    var No =req.body.No;
    var title =req.body.title;
    var content =req.body.content;
    var image =req.body.image;
    connection.query(
        `update board set title=?, content =?, image=? where No =?`,        
        [title, content,image, No],
        function(err,result){
            if(err){
                console.log(err);
                res.send("board connection Error");
            }else{
                res.redirect("/");
            }
        }
    )
})

module.exports=router;