var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var secretKey ="dfgfdgfdgfdgfd";
var Crypto = require("crypto")
const session = require('express-session');

var connection = mysql.createConnection({
    host     : 'localhost', //127.0.0.1
    port     : 3306,
    user     : 'root',
    password : '1234',
    database : 'test'
});

router.get("/", function(req, res, next){
    res.render("login");
})

router.post('/login',function(req, res){
    var post_id = req.body.post_id;
    var password = req.body.password;
    var crypto = Crypto.createHmac('sha256', secretKey).update(password).digest('hex');
    console.log(crypto);
    connection.query(
        `select * from user_list where post_id = ? and password = ?`,
        [post_id, crypto],
        function(err,result){
            if(err){
                console.log(err);
                res.send("SQL login connection Error");
            }else{
                if(result.length> 0){
                    req.session.logged = result[0];
                    console.log(req.session.logged)
                    res.redirect("/board")
                }else{
                    res.send("Not data");
                }
            }
        }
    )
    console.log(session);

})

router.get('/logout',function(req, res, next){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Session destroy error");
        }else{res.redirect("/");
        }
    })
})

module.exports=router;