const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = express.Router(),
    User = require('../db/user').User,
    userdb = new User();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.post('/login',(req,res) => {
    userdb.getData({email: req.body.email,psw: req.body.psw},(err,data)=>{
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
                userdb.saveData(req.body,(err)=>{
                    if(err){
                        res.status(200).json({
                            status: 5,
                            msg: err
                        })
                        return;
                    }
                    res.status(200).json({
                        status: 1,
                        msg: '注册成功'
                    })
                })
            }
            console.log(data)
        }else{
            res.status(200).json({
                status: 5,
                msg: err
            })
        }
        
    })
}) 

module.exports = app;