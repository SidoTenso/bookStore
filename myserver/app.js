// import { model } from 'mongoose';

const express = require('express'),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    app = express(),
    admin = require('./routes/admin'),
    production = require('./routes/production'),
    views = require('./routes/views'),
    static = require('./routes/static');

app.use(express.static('myserver/public'));
// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use("*",(req,res,next)=>{
    console.log(req.method)
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');;  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); 
    res.header("Access-Control-Allow-Credentials","true"); 
    next();
})



app.use('/admin',admin);
app.use('/prod',production);
app.use('/static',static);
app.use('/admin',views)


// art-template模版引擎配置
var template = require('art-template')
var express_template = require('express-art-template');
app.engine('html', express_template);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// module.exports = app
app.listen(3000,()=> {
          console.log('\n-----------------------------后台服务器已开启于3000端口-----------------------------\n');
})

