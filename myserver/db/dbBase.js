const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.once('open',() => {
    console.log("============================数据库已开启============================");
})
db.on('error',(err) => {
    console.log(err);
    console.log("============================数据库打开错误，请检查myserver文件夹中服务器代码，确保mongodb服务已开启============================")
})

// 数据库基类
class DbBase {
    
    constructor(model){

        this.model = model;

    }

    getData(...args){
        return this.model.find(...args)
    }

    getDataById(id,callback){
        return this.model.findById(id,callback)
    }

    saveData(data,callback){

        let model = new this.model(data);
        model.save(callback);
        
    }
    updateData(...args){
        this.model.update(...args)
    }
    
    removeData(...args){
        return this.model.remove(...args)
    }
}
 
module.exports = {
    mongoose,
    DbBase
}