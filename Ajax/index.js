var express = require("express");
var path = require("path");
var app = express();

app.set("views", path.join( __dirname , "views") );
app.set("view engine",'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res){
    res.render("index");
});

app.get("/ajax", function(req, res){
    var name = req.query.name;
    var phone = req.query.phone;
    var division = req.query.division;
    console.log(name, phone, division);    
    res.json({
        name : name,
        html : phone = "<br>" + division
    })
})

app.post("/ajax", function(req,res){
    var message = req.body.message;
    console.log(message); 
    res.json({
        message : "post 연습 잘 됐다"
    })
})

app.get("/ajax_get", function(req, res){
    var name = req.query.name;
    var phone = req.query.phone;
    var division = req.query.division;
    console.log(name, phone, division);    
    res.send("name: " + name + "phone :" + phone + "division :" + division)
})

app.post("/ajax_post", function(req,res){
    var message = req.body.message;
    console.log(message); 
    res.send("message :" + message)
})

app.get("/ajax_getJSON", function(req, res){
    var tem = req.query.tem;
    console.log(tem);    
    if (tem >32){
        res.json({
            state : "폭염주의"
        })
    }else{
        res.json({
            state : "날씨 괜춘"
        })
    }
})

var port = 3000;
app.listen(port, function(){
    console.log("웹서버 시작",port);
});
