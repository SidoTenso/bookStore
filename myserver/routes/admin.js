const express = require('express'),
    photosHandler = require('../common/photos'),
    app = express.Router(),
    User = require('../db/user').User,
    userdb = new User(),
    Production = require('../db/production').Production,
    prodb = new Production(),
    md5 = str => require('crypto').createHash('md5').update(str).digest('hex'),
    Mail = require('../db/mail').Mail,
    maildb = new Mail(),
    Fans = require('../db/fans').Fans,
    fansdb = new Fans(),
    Comment = require('../db/comment').Comment,
    commentdb = new Comment(),
    Comwall = require('../db/comwall').Comwall,
    comwalldb = new Comwall();

// const multer = require('multer'),
//     upload = multer({dest: '../routes/'})



// 登录
app.post('/login', (req, res) => {
    userdb.getData({ email: req.body.email, psw: md5(req.body.psw) }, (err, data) => {
        if (!err) {

            if (data.length == 0) {
                res.status(200).json({
                    status: 2,
                    msg: '用户邮箱或密码错误'
                })
            } else {
                let userId = String(data[0]._id)
                res.cookie('userId', userId, { maxAge: 60 * 60 * 1000 });
                res.status(200).json({
                    status: 1,
                    msg: '登录成功',
                    userInfo: data[0]
                })
            }

        } else {
            res.status(200).json({
                status: 5,
                msg: err
            })
        }
    })
})
// 注册
app.post('/register', (req, res) => {
    userdb.getData({ email: req.body.email }, (err, data) => {
        if (!err) {
            if (data.length !== 0) {
                res.status(200).json({
                    status: 2,
                    msg: '该邮箱已被注册'
                })
                return;
            } else {
                req.body.psw = md5(req.body.psw);
                userdb.saveData(req.body, (err, doc) => {
                    if (err) {
                        res.status(200).json({
                            status: 5,
                            msg: err
                        })
                        return;
                    }
                    maildb.sendMail({
                        email: req.body.email,
                        keyValue: md5(req.body.email + Date.now())
                    }).then(() => {
                        let userId = String(doc._id)
                        res.cookie('userId', userId, { maxAge: 60 * 60 * 1000 });
                        res.status(200).json({
                            status: 1,
                            msg: '注册成功',
                            userInfo: req.body
                        })

                    })
                })
            }
        } else {
            res.status(200).json({
                status: 5,
                msg: err
            })
        }

    })
})

// 注销
app.post('/users/del',(req,res)=>{
    userdb.getDataById(req.body.id).then(user=>{
        user.remove(err=>{
            if(!err){
                res.redirect(req.body.originUrl)
            }
        })
    })
})



// 激活账号
app.get('/activation', (req, res) => {
    maildb.getData({ value: req.query.key }, (err, data) => {
        if (!err) {
            if (data.length == 0) {
                res.send('该链接已失效')
            } else {
                maildb.removeData({ value: req.query.key }, (removeErr) => {
                    if (!removeErr) {
                        userdb.getData({ email: data[0].email }, (err, user) => {
                            if (!err) {
                                // res.send('激活成功')
                                user[0].activation = true;
                                user[0].save(err => {
                                    res.cookie('userId', String(user[0]._id))
                                    res.redirect('http://localhost:8080/')
                                })

                            }
                        })
                    } else {
                        res.send('激活失败')
                    }
                })
            }
        }
    })
})

// 获取用户信息
app.post('/getUserInfo', (req, res) => {
    let userId = req.body.userId;
    userdb.getData({ _id: userId }, (err, data) => {
        if (!err && data.length != 0) {
            let userInfo = {
                userName: data[0].userName,
                activation: data[0].activation,
                attentions: data[0].attentions,
                collect: data[0].collect,
                email: data[0].email,
                fans: data[0].fans,
                productions: data[0].productions,
                _id: data[0]._id,
                userPic: data[0].userPic,

            }
            res.status(200).json({
                status: 1,
                msg: '',
                userInfo
            })
        } else {
            res.status(200).json({
                status: 5,
                msg: '用户不存在'
            })
        }
    })
})
app.post('/setUserInfo', (req, res) => {
    userdb.getDataById(req.body.userId).then(data => {
        if (data) {
            if (req.query.cp) {
                if (md5(req.body.psw) !== data.psw) {
                    res.status(200).json({
                        status: 4,
                        msg: '密码错误'
                    })
                } else {
                    data.userName = req.body.userName;
                    data.psw = md5(req.body.npsw);
                    if (req.body.userPic) {
                        data.userPic = req.body.userPic;
                    }
                    data.userName = req.body.userName;
                    data.save(err => {
                        if (!err) {
                            res.status(200).json({
                                status: 1,
                                msg: '用户信息更新成功'
                            })
                        }
                    })
                }
            } else {
                data.userName = req.body.userName;
                if (req.body.userPic) {
                    data.userPic = req.body.userPic;
                }
                data.userName = req.body.userName;
                data.save(err => {
                    if (!err) {
                        res.status(200).json({
                            status: 1,
                            msg: '用户信息更新成功'
                        })
                    }
                })
            }
        } else {
            res.status(200).json({
                status: 5,
                msg: '用户不存在'
            })
        }
    })
})


// 后台更改用户信息
app.post('/users/update/:id',(req,res)=>{
    userdb.getDataById(req.params.id).then(user=>{
        user.userName = req.body.userName;
        user.personalInfo = req.body.personalInfo;
        user.activation = req.body.activation;
        user.save(err=>{
            if(!err){
                res.redirect('/admin/users/lists')
            }
        })
    })
})


// 用户上传图片
app.post('/photos', photosHandler, (req, res) => {
    var userId = req.cookies.userId
    if (userId) {
        userdb.getData({ _id: userId }, (err, data) => {
            if (!err && data.length != 0) {
                let defaultData = {
                    prodName: '默认名字',
                    likes: 0,
                    src: '/image/userphotos/default.JPG',
                    attr: 'popular',
                    status: 'uncheck',
                    uploadTime: Date.now(),
                    author: data[0]._id
                }

                let proData = Object.assign(defaultData, req.body)

                prodb.saveData(proData, (proErr) => {
                    if (!proErr) {
                        res.status(200).json({
                            status: 1,
                            msg: '存入成功'
                        })
                    }
                })
            } else {
                res.status(200).json({
                    status: 3,
                    msg: '用户信息错误，重新登录'
                })
            }
        })
    } else {
        res.status(200).json({
            status: 3,
            msg: '用户信息错误，重新登录'
        })
    }

})

// 用户收藏
app.post('/collect', (req, res) => {
    userdb.getData({ _id: req.body.userId }, (err, data) => {
        if (!err && data.length !== 0) {
            if (data[0].collect.indexOf(req.body.photo) == -1) {
                data[0].collect.push(req.body.photo);
                data[0].save(err => {
                    if (!err) {
                        prodb.getDataById(req.body.photo, (proErr, data) => {
                            if (!proErr) {
                                data.likes += 1;
                                data.save();
                                res.status(200).json({
                                    status: 1,
                                    msg: '收藏成功'
                                })

                            }
                        })

                    }
                })
            } else {
                res.status(200).json({
                    status: 1,
                    msg: '已收藏过照片'
                })
            }
        } else {
            res.status(200).json({
                status: 5,
                msg: '收藏失败'
            })
        }
    })

})

// 用户关注
app.post('/attention', (req, res) => {
    fansdb.getData({ master: req.body.id, fans: req.body.userId }, (err, data) => {
        if (!err) {
            if (!data.length) {
                fansdb.saveData({ master: req.body.id, fans: req.body.userId }, (err) => {
                    if (!err) {
                        res.status(200).json({
                            status: 1,
                            msg: '已关注'
                        })
                    }
                })
            } else {
                fansdb.removeData({ master: req.body.id, fans: req.body.userId }, (err) => {
                    if (!err) {
                        res.status(200).json({
                            status: 1,
                            msg: '关注'
                        })
                    }
                })
            }
        } else {
            res.status(200).json({
                status: 5,
                msg: '关注失败'
            })
        }
    })
})

app.post('/getAttentions', (req, res) => {
    fansdb.getData({ fans: req.body.userId }, (err, data) => {
        if (!err) {
            let attenArr = data.map(item => {
                return item.master
            })
            res.status(200).json({
                status: 1,
                data: attenArr
            })

        }
    })
})
app.post('/getfans', (req, res) => {
    fansdb.getData({ master: req.body.id }).populate('fans', 'userName _id').then((data) => {
        let attenArr = data.map(item => {
            return item.fans
        })
        res.status(200).json({
            status: 1,
            data: attenArr
        })

    })
})


// 回复评论
app.post('/recoment', (req, res) => {
    if (req.cookies.userId) {
        userdb.getDataById(req.cookies.userId).then(user => {
            if (user) {
                commentdb.saveData({
                    owner_user_id: req.cookies.userId,
                    target_user_id: req.body.target_id,
                    content: req.body.content,
                    created_time: Date.now()
                }, (err, comment) => {
                    comwalldb.getDataById(req.body.comwallId).then(comwall => {
                        comwall.comments.push(comment._id);
                        comwall.save(err => {
                            if (!err) {
                                res.status(200).json({
                                    status: 1,
                                    msg: '保存成功'
                                })
                            }
                        })
                    })
                })
            }
        })
    }
})

// 用户留言
app.post('/comment', (req, res) => {
    if (req.body.comment && req.cookies.userId) {
        let content = req.body.comment,
            id = req.body.id,
            user = req.cookies.userId;
        userdb.getDataById(user, (err, data) => {
            if (!err && data) {
                let created_time = Date.now();
                comwalldb.saveData({ content, user, created_time }, (err, data) => {
                    if (!err) {
                        userdb.getDataById(id, (err, useritem) => {
                            if (!err) {
                                useritem.comments.push(data._id);
                                useritem.save(err => {
                                    if (!err) {
                                        res.status(200).json({
                                            status: 1,
                                            msg: '留言成功'
                                        })
                                    }
                                })
                            }
                        })

                    }
                })
            }else{
                res.status(200).json({
                    status: 5,
                    msg: '请重新登录'
                })
            }
        })
    }
})


// 获取搜索结果
app.post('/getSearch', (req, res) => {
    let result = {}
    prodb.getData({ status: 'pass', prodName: new RegExp(req.body.searchkey, 'i') }, { _id: 1, prodName: 1, src: 1 })
        .then(photos => {
            result.photos = photos;
            userdb.getData({ userName: new RegExp(req.body.searchkey, 'i') }, { _id: 1, userName: 1 })
                .then(user => {
                    result.authors = user
                    res.status(200).json({
                        status: 1,
                        data: result
                    })
                })
        })
})



module.exports = app;