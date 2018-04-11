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


module.exports = app;