var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var secretKey ="dfgfdgfdgfdgfd";
const session = require('express-session');
var Crypto = require("crypto")

var connection = mysql.createConnection({
    host     : 'localhost', //127.0.0.1
    port     : 3306,
    user     : 'root',
    password : '1234',
    database : 'test'
});

router.get("/", function(req, res, next){
    res.render("index");
})

router.post('/index',function(req, res){
    var post_id = req.body.post_id;
    var password = req.body.password;
    var crypto = Crypto.createHmac('sha256', secretKey).update(password).digest('hex');
    connection.query(
        `select * from user_list where post_id = ? and password = ?`,
        [post_id, crypto],
        function(err,result){
            console.log(result[0]);
            if(err){
                console.log(err);
                res.render("error",{
                    message : 'SQL login connection Error'
                });
            }else{
                if(result.length> 0){
                    req.session.logged = result[0];
                    console.log(req.session.logged);
                    res.redirect("/board");
                }else{
                    res.render("error2",{
                        message : '아이디나 비밀번호가 맞지 않습니다'
                    });
                }
            }
        }
    )
    console.log(session);

})

router.get('/signup1',function(req, res, next){
    res.render("signup1");
})

router.post('/signup2',function(req, res){
    console.log(req.body);
    var post_id =req.body.post_id;
    var name =req.body.name;
    var password =req.body.password;
    var crypto = Crypto.createHmac('sha256', secretKey).update(password).digest('hex');
    var division =req.body.division;
    var linkcode =req.body.linkcode;
    console.log(post_id, name, crypto, division, linkcode);
    connection.query(
        `select * from user_list where post_id =?`,
        [post_id],
        function(err, result){
            if(err){
                console.log(err);
                res.send("SQL connect Error");
            }else{
                if(result.length > 0){
                    res.send("이미 존재하는 아이디");
                }else{
                    connection.query(
                        `insert into user_list (post_id, password, name,
                            division, linkcode) values (?, ?, ?, ?, ?)`,
                            [post_id, crypto, name, division, linkcode],
                            function(err2, result2){
                                if(err2){
                                    console.log(err2);
                                    res.send("SQL insert Error");
                                }else{
                                    res.redirect("/");
                                }
                            } 
                    )
                }
                }

            }
    )
})

router.get('/logout',function(req, res, next){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.render("error",{
                message : 'Session destroy error'
            });
        }else{res.redirect("/");
        }
    })
})

module.exports=router;