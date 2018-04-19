const dbBase = require('./dbBase').DbBase,
    mongoose = require('./dbBase').mongoose;

const prodSchema = mongoose.Schema({
    prodName: String,
    likes: Number,
    src: String,
    attr: String,
    status: String,
    uploadTime: Number,
    description: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    comments: [{type: Schema.Types.ObjectId,ref: 'comwall'}]
})

const ProdModel = mongoose.model('production',prodSchema);

class Production extends dbBase{
    constructor(){
        super(ProdModel);
    }

    saveComment(opts,callback){
        if(opts.comment && opts.userId){
            this.model.findById(opts.id).then(photos =>{
                photos.comments.push({
                    comment: opts.comment,
                    observer: opts.userId
                })
                console.log(photos)
                photos.save(err=>{
                    if(err){
                        console.log('评论失败')
                        callback(err)
                    }else{
                        callback(null,photos)
                    }
                })
            })
        }

    }
}

module.exports = {
    mongoose,
    Production
}