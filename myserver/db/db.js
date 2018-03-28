const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
const Schema = mongoose.Schema;
db.once('open',() => {
    console.log("============================数据库已开启============================");
})
db.on('error',(err) => {
    console.log(err);
    console.log("============================数据库打开错误，请检查myserver文件夹中服务器代码，确保mongodb服务已开启============================")
})

const userSchema = new Schema({
    username: String,
    password: String,
    uid: Number,
    friends: [{type: Schema.Types.ObjectId, ref: "User"}],
    groups :[{type: Schema.Types.ObjectId, ref: "Group"}]

})
const groupSchema = new Schema({
    groupname: String,
    gid: Number,
    members: [{type: Schema.Types.ObjectId, ref: "User"}],
    
})