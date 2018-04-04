const dbBase = require('./dbBase').DbBase,
mongoose = require('./dbBase').mongoose,
Schema = mongoose.Schema,
nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    auth: {
        user: 'Sidotenso@163.com',
        pass: '1204168498gzx'
    }
})


const mailSchema = Schema({
    userId: {type:Schema.Types.ObjectId, ref: 'user'},
    status: String,
    value: String
})

const mailModel = mongoose.model('mail',mailSchema);

class Mail extends dbBase{
    constructor(){
        super(mailModel);
    }

    sendMail(opts){
        return transporter.sendMail({
            from: 'Sidotenso@163.com',
            to: opts.email,
            subject: '激活账号',
            html: '<h1>打开链接激活账号</h1> <a href="'+ opts.url + '" target="_blank"></a>'
        })
    }
}

module.exports = {
    mongoose,
    Mail
}