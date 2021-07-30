var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var Promise = require('bluebird');
require("date-format-lite");
var mysql = require('mysql2');
var port = 3000;
var app = express();
var router = express.Router();

var connection = mysql.createConnection({
    host     : 'localhost', //127.0.0.1
    port     : 3306,
    user     : 'root',
    password : '1234',
    database : 'test'
});

router.use(express.static(path.join(__dirname, "public")));

router.get("/", function (req, res) {
    connection.query(
        `select * from result`,
	function (err,result) {
		var tasks = result;
		
		for (var i = 0; i < tasks.length; i++) {
			tasks[i].start_date = tasks[i].start_date.format("YYYY-MM-DD hh:mm:ss");
			tasks[i].end_date = tasks[i].end_date.format("YYYY-MM-DD hh:mm:ss");
			tasks[i].open = true;
			tasks[i].duration = tasks[i].end_date -tasks[i].end_date; 
		}
		console.log(tasks);
		res.send({
			data: tasks,
		});

	})
});

module.exports = router;