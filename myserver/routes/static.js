const express = require('express'),
    app = express.Router();


app.post('/getmagazines',(req,res)=>{
    let magazines = require('../common/magazines')
    res.status(200).json({
        status: 1,
        data: magazines
    })
})

module.exports = app;
