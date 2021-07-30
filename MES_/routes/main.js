var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var moment = require('moment');

var Promise = require('bluebird');
require("date-format-lite");

var connection = mysql.createConnection({
    host     : 'localhost', //127.0.0.1
    port     : 3306,
    user     : 'root',
    password : '1234',
    database : 'test'
  });

router.get("/header",function(req,res){
    res.render("header",{name : "none"});
})

router.get("/add_article", function(req, res, next){
    if (!req.session.logged){ //log in 확인
        res.redirect("/");
    }else{
        res.render("add_article1");
    }
})

router.post('/add_article2',function(req, res){
    if (!req.session.logged){ //log in 확인
        res.redirect("/");
    }else{
        var No =req.body.No;
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
            `select * from demand`,
            function(err,result){
                if(err){
                    console.log(err);
                    res.render("error",{
                        message : 'board connection Error'
                    });
                }else{
                    res.render("article_list", {demand : result, session : req.session.logged});
                }
            }
        )  
    }
})

router.get("/eqp_arrange", function(req, res){
    if (!req.session.logged){ //log in 확인
        res.redirect("/");
    }else{
        connection.query(
            `select * from eqp_arrange`,
            function(err,result){
                if(err){
                    console.log(err);
                    res.render("error",{
                        message : 'board connection Error'
                    });
                }else{
                    res.render("eqp_arrange", {eqp_arrange : result, session : req.session.logged});
                }
            }
        )  
    }
})

router.get("/equipment", function(req, res){
    if (!req.session.logged){ //log in 확인
        res.redirect("/");
    }else{
        connection.query(
            `select * from equipment`,
            function(err,result){
                if(err){
                    console.log(err);
                    res.render("error",{
                        message : 'board connection Error'
                    });
                }else{
                    res.render("equipment", {equipment : result, session : req.session.logged});
                }
            }
        )  
    }
})

router.get("/graph",function(req,res){
    res.render("graph");
})

router.get("/info", function(req, res){
    var No = req.query.No;
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
                connection.query(
                    `select * from comment where parent_num = ?`,
                    [No],
                    function(err,result1){
                        if(err){
                            console.log(err);
                            res.render("error",{
                                message : '댓글 실패'
                            });
                        }else{
                            res.render("info", {
                                article : result,
                                post_id : req.session.logged.post_id,
                                name : req.session.logged.name,
                                comment : result1
                            });
                        }
                    }
                )    
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
                    res.render("edit1",{article : result})
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

router.post("/add_comment",function(req, res, next){
    var No =req.body.No;
    var comment =req.body.comment;
    var post_id =req.session.logged.post_id;
    var name =req.session.logged.name;
    var date = moment().format('YYYY-MM-DD');
    var time = moment().format('HH:MM:SS');
    var comment =req.body.comment;
    console.log(No,comment,post_id,name,date,time,comment);
    connection.query(
        `insert into comment (parent_num, opinion, post_id, name, date, time) values (?, ?, ?, ?, ?, ?)`,
            [No, comment, post_id, name, date, time],
            function(err,result){
                if(err){
                    console.log(err);
                    res.render("error",{
                        message : '댓글 추가 실패'
                    });
                }else{
                    res.redirect("/board/info?No="+No);
                }
            }
    );

})

router.get("/comment_del/:parent_num/:No",function(req, res){
    var parent_num =req.params.parent_num;
    var No =req.params.No;
    console.log(parent_num,No);
    connection.query(
        `delete from comment where No = ?`,        
        [No],
        function(err,result){
            if(err){
                console.log(err);
                res.render("error",{
                    message : 'board connection Error'
                });
            }else{
                res.redirect("/board/info?No="+parent_num);
            }
        }
    )    
})

router.get("/comment_like_hate",function(req,res,next){
    var No = req.query.No;
    var parent_num = req.query.parent_num;
    var up_down = parseInt(req.query.up_down) + 1;
    var state = req.query.state;
    console.log(No, parent_num,up_down);
    if(state=="like"){
        connection.query(
            `update comment set up=? where No =?`,        
            [up_down, No],
            function(err,result){
                if(err){
                    console.log(err);
                    res.render("error",{
                        message : 'board connection Error'
                    });
                }else{
                    res.redirect("/board/info?No="+parent_num);
                }
            }
        )
    }else{
        connection.query(
            `update comment set down=? where No =?`,        
            [up_down, No],
            function(err,result){
                if(err){
                    console.log(err);
                    res.render("error",{
                        message : 'board connection Error'
                    });
                }else{
                    console.log("%%%%%%%%")
                    res.redirect("/board/info?No="+parent_num);
                }
            }
        )
    }   
})

module.exports=router;