const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = express.Router(),
    User = require('../db/user').User,
    userdb = new User(),
    md5 = str=>require('crypto').createHash('md5').update(str).digest('hex'),
    Mail = new (require('../db/mail').Mail)();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// 登录
app.post('/login',(req,res) => {
    userdb.getData({email: req.body.email,psw: md5(req.body.psw)},(err,data)=>{
        if(!err){
            
            if(data.length == 0){
                res.status(200).json({
                    status: 2,
                    msg: '用户邮箱或密码错误'
                })
            }else{
                res.cookie('userId',data[0]._id,{maxAge: 30*60*1000});
                res.status(200).json({
                    status:1,
                    msg: '登录成功',
                    userInfo: data[0]
                })
            }
            
        }else{
            res.status(200).json({
                status: 5,
                msg: err
            })
        }
    })
})
// 注册
app.post('/register',(req,res) => {
    userdb.getData({email: req.body.email},(err,data)=>{
        if(!err){
            if(data.length !== 0){
                res.status(200).json({
                    status: 2,
                    msg: '该邮箱已被注册'
                })
                return;
            }else{
                req.body.psw = md5(req.body.psw);
                userdb.saveData(req.body,(err)=>{
                    if(err){
                        res.status(200).json({
                            status: 5,
                            msg: err
                        })
                        return;
                    }
                    Mail.sendMail({
                        email: req.body.email,
                        url: 'http://localhost:3000?key='+md5(req.body.email+Date.now())
                    }).then(()=>{
                        res.status(200).json({
                            status: 1,
                            msg: '注册成功',
                            userInfo: req.body
                        })
                        
                    })
                })
            }
        }else{
            res.status(200).json({
                status: 5,
                msg: err
            })
        }
        
    })
}) 

module.exports = app;