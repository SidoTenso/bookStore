const express = require('express'),
    photosHandler = require('../common/photos'),
    app = express.Router(),
    md5 = str=>require('crypto').createHash('md5').update(str).digest('hex'),
    Production = require('../db/production').Production,
    prodb = new Production();


// 获取照片列表
app.post('/getphotos',(req,res)=>{
    var limit = req.query.limit ? ~~req.query.limit: undefined;
    prodb.getData({}).limit(limit).populate('author').then(data=>{
        console.log(data)
        res.status(200).json({
            status: 1,
            msg: '',
            data
        })
    }).p
})

// 获取照片信息
app.post('/getPhotoInfo',(req,res)=>{
    console.log(req.body.id)
    prodb.getData({_id:req.body.id}).populate('author comments.observer', '_id userName').then(data=>{
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
    console.log
    if(req.body.comment && req.cookies.userId){
        let comment = req.body.comment,
            userId = req.cookies.userId,
            id = req.body.id;
            console.log({comment,id,userId})
        prodb.saveComment({comment,id,userId},(err,data)=>{
            if(!err){
                res.status(200).json({
                    status: 1,
                    msg:'评论成功',
                    data: data
                })
            }
        })
    }
})


module.exports = app;