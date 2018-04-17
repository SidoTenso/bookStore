const dbBase = require('./dbBase').DbBase,
    mongoose = require('./dbBase').mongoose
    Schema = mongoose.Schema;

const fansSchema = Schema({
    master: {type: Schema.Types.ObjectId,ref: 'user'},
    fans: {type: Schema.Types.ObjectId,ref: 'user'}
})

const fansModel = mongoose.model('fans',fansSchema);


class Fans extends dbBase{
    constructor(){
        super(fansModel);
    }
}


module.exports = {
    mongoose,
    Fans
}