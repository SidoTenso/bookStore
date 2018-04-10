const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = express.Router(),
    User = require('../db/user').User,
    userdb = new User(),
    md5 = str=>require('crypto').createHash('md5').update(str).digest('hex'),
    Mail = require('../db/mail').Mail;
    maildb = new Mail();

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
                let userId = String(data[0]._id)
                console.log(JSON.stringify(data[0]._id));
                res.cookie('userId',userId,{maxAge: 30*60*1000});
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
                userdb.saveData(req.body,(err,doc)=>{
                    if(err){
                        res.status(200).json({
                            status: 5,
                            msg: err
                        })
                        return;
                    }
                    maildb.sendMail({
                        email: req.body.email,
                        keyValue: md5(req.body.email+Date.now())
                    }).then(()=>{
                        let userId = String(doc._id)
                        res.cookie('userId',userId,{maxAge: 30*60*1000});
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

// 激活账号
app.get('/activation',(req,res)=>{
    console.log(req.query.key)
    maildb.getData({value:req.query.key},(err,data)=>{
        if(!err){
            if(data.length == 0){
                res.send('该链接已失效')
            }else{
                maildb.removeData({value:req.query.key},(removeErr)=>{
                    if(!removeErr){
                        userdb.updateData({email: data[0].email},{activation:true},(err,data)=>{
                            console.log(data)
                            res.send('激活成功')
                        })
                    }else{
                        res.send('激活失败')
                    }
                })
            }
        }
    })
})

// 获取用户信息
app.post('/getUserInfo',(req,res)=>{
    console.log(req.body)
    let userId = req.body.userId;
    userdb.getData({_id: userId},(err,data)=>{
        if(!err){
            let userInfo = {
                userName: data[0].userName,
                activation: data[0].activation,
                attentions: data[0].attentions,
                collect: data[0].collect,
                email: data[0].email,
                fans: data[0].fans,
                productions: data[0].productions,
                _id: data[0]._id,

            }
            res.status(200).json({
                status: 1,
                msg: '',
                userInfo
            })
        }
    })
})


module.exports = app;