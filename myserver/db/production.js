const dbBase = require('./dbBase').DbBase,
    mongoose = require('./dbBase').mongoose;

const prodSchema = mongoose.Schema({
    userName: String,
    email: String,
    productions: [{type: mongoose.Schema.Types.ObjectId, ref: 'production'}]
})

const Production = mongoose.model('user',prodSchema);

module.exports = {
    mongoose,
    Production
}