const dbBase = require('./dbBase').DbBase,
    mongoose = require('./dbBase').mongoose
    Schema = mongoose.Schema;

const commentSchema = Schema({
    owner_user_id: {type: Schema.Types.ObjectId,ref: 'user'},
    target_user_id: {type: Schema.Types.ObjectId,ref: 'user'},
    content: String,
    created_time: Number
})

const commentModel = mongoose.model('comment',commentSchema);


class Comment extends dbBase{
    constructor(){
        super(commentModel);
    }
}


module.exports = {
    mongoose,
    Comment
}