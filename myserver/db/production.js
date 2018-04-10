const dbBase = require('./dbBase').DbBase,
    mongoose = require('./dbBase').mongoose;

const prodSchema = mongoose.Schema({
    prodName: String,
    likes: Number,
    src: String,
    attr: String,
    status: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    comments:[{
        comment: String,
        observer:{type: mongoose.Schema.Types.ObjectId,ref: 'user'}
    }]
})

const ProdModel = mongoose.model('production',prodSchema);

class Production extends dbBase{
    constructor(){
        super(ProdModel);
    }
}

module.exports = {
    mongoose,
    Production
}