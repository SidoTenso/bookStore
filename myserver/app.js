const express = require('express'),
    bodyParser = require("body-parser")
    app = express();

app.use(express.static('myserver/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("*",(req,res,next)=>{
    console.log(req.method)
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');;  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    // res.header("X-Powered-By",' 3.2.1')  
    // res.header("Content-Type", "application/json;charset=utf-8");  
    next();
})

app.post('/register',(req,res) => {
    console.log(req.params,req.query,req.body)
    res.send('这不是服务器1');
}) 
app.listen(3000,()=> {
    console.log('\n-----------------------------后台服务器已开启于3000端口-----------------------------\n');
})