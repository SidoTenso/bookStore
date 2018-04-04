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

    getData(filter,callback){
        this.model.find(filter,callback)
    }

    saveData(data,callback){

        let model = new this.model(data);
        model.save(callback);
        
    }
    updateData(filter,newData,callback){
        this.model.update(filter,newData,callback)
    }
}
 
module.exports = {
    mongoose,
    DbBase
}