var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var moment = require('moment');

var connection = mysql.createConnection({
    host     : process.env.host, //127.0.0.1
    port     : process.env.port,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
  });


router.get("/add_article", function(req, res, next){
    if (!req.session.logged){ //log in 확인
        res.redirect("/");
    }else{
        res.render("add_article");
    }
})

router.post('/add_article2',function(req, res){
    if (!req.session.logged){ //log in 확인
        res.redirect("/");
    }else{
        var No =req.body
        .No;
        var title =req.body.title;
        var content =req.body.content;
        var image =req.body.image;
        var date = moment().format('YYYY-MM-DD');
        var time = moment().format('HH:MM:SS');
        var author = req.session.logged["post_id"];
        console.log(No, title, content, date, time);
        connection.query(
            `insert into board (No, title, content,image, date, time, author) values (?, ?, ?, ?, ?, ?, ?)`,
                [No, title, content, image, date, time, author]);
        res.redirect("/board");
    }
})

router.get("/", function(req, res){
    if (!req.session.logged){ //log in 확인
        res.redirect("/");
    }else{
        connection.query(
            `select * from board`,
            function(err,result){
                console.log(result.length);
                if(err){
                    console.log(err);
                    res.render("error",{
                        message : 'board connection Error'
                    });
                }else{
                    res.render("article_list", {article : result, session : req.session.logged});
                }
            }
        )
    }
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
                res.render("error",{
                    message : 'board connection Error'
                });
            }else{
                res.render("search", {article : result});
            }
        }
    )
})

router.get('/delete',function(req, res){
    if (!req.session.logged){ //log in 확인
        res.redirect("/");
    }else{
        var No =req.query.No;
        connection.query(
            `select * from board where No = ?`,
            [No],
            function(err,result){
                if (req.session.logged.post_id == result[0].author){
                    connection.query(
                        `delete from board where No = ?`,
                        [No],
                        function(err,result){
                            if(err){
                                console.log(err);
                                res.render("error",{
                                    message : 'board connection Error'
                                });
                            }else{
                                res.redirect("/board");
                            }
                        }
                    )
                }else{
                    res.send("권한이 없습니다");
                }
        })
    }
})

router.get('/edit',function(req, res){
    if (!req.session.logged){ //log in 확인
        res.redirect("/");
    }else{
        var No =req.query.No;
        console.log(No)
        connection.query(
            `select * from board where No = ?`,
            [No],
            function(err,result){
                if(err){
                    console.log(err);
                    res.render("error",{
                        message : 'board connection Error'
                    });
                }else{
                    res.render("edit",{article : result})
                }
            }
        )
    }
})

router.post('/edit/:No',function(req, res){
    if (!req.session.logged){ //log in 확인
        res.redirect("/");
    }else{
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
                    res.render("error",{
                        message : 'board connection Error'
                    });
                }else{
                    res.redirect("/board");
                }
            }
        )
    }
})

module.exports=router;