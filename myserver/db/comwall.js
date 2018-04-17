const dbBase = require('./dbBase').DbBase,
    mongoose = require('./dbBase').mongoose
    Schema = mongoose.Schema;

const comwallSchema = Schema({
    content: String,
    created_time: Number,
    user: {type:Schema.Types.ObjectId,ref: 'user'},
    comments: [{type: Schema.Types.ObjectId,ref: 'comment'}]
})

const comwallModel = mongoose.model('comwall',comwallSchema);


class Comwall extends dbBase{
    constructor(){
        super(comwallModel);
    }
}


module.exports = {
    mongoose,
    Comwall
}