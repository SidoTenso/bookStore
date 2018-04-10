const fs = require('fs'),
    multer = require('multer'),
    createFolder = function(folder){
        try{
            fs.accessSync(folder); 
        }catch(e){
            fs.mkdirSync(folder);
        }  
    },
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, createFolder('../public/image/userphotos'))
        },
        filename: function (req, file, cb) {
            console.log(file)
            cb(null, file.fieldname + '-' + Date.now())
        }
    }),
    upload = multer({dest: '../public/image'}),
    single = upload.single('photos');





// module.exports = (req, res) => {
//     // console.log(req)
//     single(req,res,(err)=>{
//         if(err){
//             console.log(err)
//             res.status(200).json({
//                 status: 5,
//                 msg: ['存入失败',err]
//             })
//         }else{

//             res.status(200).json({
//                 status: 1,
//                 msg: '存入成功'
//             })
//         }
//     })
// }
module.exports  = single