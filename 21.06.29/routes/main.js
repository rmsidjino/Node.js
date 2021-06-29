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
        var _id = req.query.id;
        var _password = req.query.password;
        console.log(_id,_password);
        res.render('second.ejs',{
            id : _id,
            password : _password
        });
    })

    return router;
}
