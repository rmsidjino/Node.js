var express = require('express');
var router = express.Router();

module.exports = function(){
    router.get('/',function(req, res, next){
        res.render('main.ejs');
    })

    router.post('/second', function(req, res, next){
        console.log("next");
        next();
    }, function(req, res){
        var _id = req.body.id;
        var _password = req.body.password;
        console.log(_id,_password);
        //ID : test, password :1234
        if(_id == 'test' && _password == '1234'){
            res.render('second.ejs',{
                id : _id,
                password : _password
            });
        }else{
            res.redirect('/');
        };
    })

    router.get('/second',function(req, res, next){
        if(_id == undefined || _password == undefined){
            res.render('second.ejs',{
                id : "undefined",
                password : "undefined"
            });
        }
    })

    router.get('/third',function(req, res, next){
        res.render('third.ejs',{
            id : "sss",
            password : "sss"
        });
    })

    return router;
}
