const express = require('express'),
    photosHandler = require('../common/photos'),
    app = express.Router(),
    md5 = str=>require('crypto').createHash('md5').update(str).digest('hex'),
    User = require('../db/user').User,
    userdb = new User(),
    Production = require('../db/production').Production,
    prodb = new Production(),
    Comwall = require('../db/comwall').Comwall,
    comwalldb = new Comwall();


// 获取照片列表
app.post('/getphotos',(req,res)=>{
    let limit = req.query.limit ? ~~req.query.limit: undefined;
    prodb.getData({status: 'pass'}).limit(limit).populate('author').then(data=>{
        console.log(data)
        res.status(200).json({
            status: 1,
            msg: '',
            data
        })
    })
})
// 获取收藏照片列表
app.post('/getCollects',(req,res)=>{
    let limit = req.query.limit ? ~~req.query.limit: 0;
    userdb.getDataById(req.body.id).limit(limit).populate('collect', 'src _div').then(data=>{
        console.log(data)
        res.status(200).json({
            status: 1,
            data
        })
    })
})

// 获取某个用户照片列表
app.post('/getphotosById',(req,res)=>{
    let filter = {},
        limit = req.body.limit ? ~~req.body.limit: 0;
    filter.author = req.body.id;
    filter.status = 'pass';
    prodb.getData(filter).limit(limit).populate('author').then(data=>{
        console.log(111111111111111111111)
        res.status(200).json({
            status: 1,
            msg: '',
            data
        })
    })
})

// 获取照片信息
app.post('/getPhotoInfo',(req,res)=>{
    console.log(req.body.id)
    prodb.getData({_id:req.body.id}).populate('author', '_id userName').then(data=>{
        prodInfo = Object.assign({
            authorId: data[0].author.id,
            authorName: data[0].author.userName
        },data[0])
        console.log(data)
        res.status(200).send(data[0])
    })
})
// 照片评论
app.post('/uploadComment',(req,res)=>{

    if(req.body.comment && req.cookies.userId){
        let content = req.body.comment,
        id = req.body.id,
        user = req.cookies.userId;
        userdb.getDataById(user,(err,data)=>{
            if(!err && data){
                let created_time = Date.now();
                comwalldb.saveData({content,user,created_time },(err,data)=>{
                    if(!err){
                        prodb.getDataById(id,(err,pro)=>{
                            if(!err){
                                pro.comments.push(data._id);
                                pro.save(err=>{
                                    if(!err){
                                        res.status(200).json({
                                            status: 1,
                                            msg:'评论成功'
                                        })
                                    }
                                })
                            }
                        })
                        
                    }
                })
            }
        })
    }
})



// 获取评论列表
app.post('/getComments',(req,res)=>{
    if(req.body.id){
        prodb.getDataById(req.body.id).populate({
            path: 'comments',
            model: 'comwall',
            populate:{
                path: 'user comments',
                populate:{
                    path: 'owner_user_id target_user_id',
                    select: '_id userName'
                }
            }

        }).then(data=>{
            if(data){
                let result = [];
                data.comments.forEach((comwall) => {
                    let tempObj = {};
                    
                    tempObj.content = comwall.content;
                    tempObj.created_time = comwall.created_time;
                    tempObj.comwallId = comwall._id;

                    tempObj.user = {
                        id: comwall.user._id,
                        userName: comwall.user.userName
                    };
                    tempObj.comments = comwall.comments;
                    result.push(tempObj);
                });
                res.status(200).json({
                    status: 1,
                    data:result
                })
            }
        })
    }
})


module.exports = app;