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
    comwalldb = new Comwall(),
    actions = require('../common/actions');


app.get('/photos/:status?', (req, res) => {
    function dataHandle(data,query) {
        let list = [];

        data.forEach(item => {

            list.push({
                prodName: item.prodName,
                attr: item.attr,
                status: item.status,
                src: item.src,
                author: item.author.userName,
                id: item.id,
            })

        })
        res.render('admin/photos/list', {
            list: list,
            status: actions,
            nowPage: req.params.status,
            query: query || ''
        })
    }
    if (!req.query.tp) {
        prodb.getData({ status: req.params.status }).populate('author', '_id userName').then(data => {
            dataHandle(data);
        })
    }else if(req.query.tp == "name"){
        prodb.getData({ status: req.params.status, prodName: new RegExp(req.query.prodName,'i') }).populate('author', '_id userName').then(data => {
            dataHandle(data,req.query.prodName);
        })
    }
})


app.get('/users/lists',(req,res)=>{
    function dataHandle(users,query){
        let list = [];
        users.forEach(item => {

            list.push({
                userName: item.userName,
                email: item.email,
                personalInfo: item.personalInfo,
                activation: item.activation,
                userPic: item.userPic,
                id: item.id,
            })

        })
        res.render('admin/users/list', {
            list: list,
            query: query || ''
        })
    }
    if (!req.query.tp) {
        userdb.getData({}).then(users=>{
            dataHandle(users)
        })
        
    }else if(req.query.tp == "email"){
        userdb.getData({email:req.query.email}).then(users=>{
            dataHandle(users,req.query.email)
        })
    }
})


// 用户编辑
app.get('/users/edit/:id',(req,res)=>{
    userdb.getDataById(req.params.id).then(data=>{
        let renderData = {};
        renderData.userName = data.userName;
        renderData.personalInfo = data.personalInfo;
        renderData.activation = data.activation;
        renderData.id = req.params.id;

        res.render('admin/users/edit',renderData)

    })
    
        
})

module.exports = app;