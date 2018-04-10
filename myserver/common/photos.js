const fs = require('fs'),
    md5 = str=>require('crypto').createHash('md5').update(str).digest('hex'),
    multer = require('multer'),
    createFolder = function(folder){
        try{
            fs.accessSync(folder); 
        }catch(e){
            fs.mkdirSync(folder);
        } 
        return folder 
    },
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, createFolder('./myserver/public/image/userphotos'))
        },
        filename: function (req, file, cb) {
            console.log(req.body,file)
            let fileFormat = (file.originalname).split(".");
            let fileName = md5(file.originalname+Date.now()) + '.' + fileFormat[fileFormat.length - 1];
            req.body.src = '/image/userphotos/'+fileName;
            cb(null, fileName)
        }
    }),
    upload = multer({storage}),
    single = upload.single('photos');




module.exports = (req, res,next) => {
    // console.log(req)
    single(req,res,(err)=>{
        if(err){
            console.log(err)
            res.status(200).json({
                status: 5,
                msg: ['存入失败',err]
            })
            return;
        }else{
            
            next();
        }
    })
}
// module.exports  = single