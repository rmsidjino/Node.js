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

router.get("/add_car", function(req, res, next){
    res.render("add_car");
})

router.get("/", function(req, res, next){
    res.render("manager");
})

router.post('/add_car2',function(req, res){
    var car_id =req.body.car_id;
    var car_div =req.body.car_div;
    var car_type =req.body.car_type;
    var car_birth =req.body.car_birth;
    console.log(car_id, car_div, car_type, car_birth);
    connection.query(
        `insert into car_list (car_id, car_div, car_type,
              car_birth) values (?, ?, ?, ?)`,
            [car_id, car_div, car_type, car_birth])
})

router.get("/car_list", function(req, res){
    connection.query(
        `select * from car_list`,
        function(err,result){
            console.log(result);
            if(err){
                console.log(err);
                res.send("car_list connection Error");
            }else{
                res.render("car_list", {car : result});
            }
        }
    )
})

router.get("/search", function(req, res){
    var car_id = req.query.car_id;
    console.log(car_id);
    connection.query(
        `select * from car_list where car_id = ?`,
        [car_id],
        function(err,result){
            if(err){
                console.log(err);
                res.send("car_list connection Error");
            }else{
                res.render("search", {car : result});
            }
        }
    )
})

module.exports=router;