var express = require('express');
var bodyParser = require ('body-parser');

var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.listen(9000);

 app.use(function(req, res, next) { 
 	res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept") 
    next() 
})
app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
})
app.get('/angular.min.js',function(req,res){
	res.sendFile(__dirname+'/angular.min.js');
})
app.get('/index1.js',function(req,res){
	res.sendFile(__dirname+'/index1.js');
})
app.get('/web3.js/dist/web3.min.js',function(req,res){
	res.sendFile(__dirname+'/web3.js/dist/web3.min.js');
})
// Console will print the message
console.log('Server running at http://127.0.0.1:9000/');