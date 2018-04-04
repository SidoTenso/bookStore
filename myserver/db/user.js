const dbBase = require('./dbBase').DbBase,
    mongoose = require('./dbBase').mongoose
    Schema = mongoose.Schema;

const userSchema = Schema({
    userName: String,
    email: String,
    psw: String,
    productions: [{type: Schema.Types.ObjectId, ref: 'production'}],
    fans: [{type: Schema.Types.ObjectId, ref: 'user'}],
    attentions: [{type: Schema.Types.ObjectId, ref: 'user'}],
    collect: [{type: Schema.Types.ObjectId, ref: 'production'}],
    activation: {type: Boolean, default: false}
})

const UserModel = mongoose.model('user',userSchema);

class User extends dbBase{
    constructor(){
        super(UserModel)
    }
    
    saveData(data,callback){
        console.log(data)
        let errMsg = ''
        if(!data.userName) (errMsg =  '存入失败[用户名为空]');
        else if(!data.email) (errMsg =  '存入失败[邮箱为空]');
        else if(!data.psw) (errMsg =  '存入失败[密码为空]');

        if(errMsg) {
            typeof callback == 'function' && callback(errMsg);
            return;
        }else{
            let user = new this.model(data);
            user.save(callback);
        }
        
    }

}

module.exports = {
    mongoose,
    User
}