const dbBase = require('./dbBase').DbBase,
    mongoose = require('./dbBase').mongoose
    Schema = mongoose.Schema;

const userSchema = Schema({
    userName: String,
    userPic: {type:String,default: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTIzMTk4NzAwMTI0IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjUgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwMzM1IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjE2LjAxNTYyNSIgaGVpZ2h0PSIxNiI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNOTQ0LjAyMjI3IDkyMC40Mjk5MDRDODg2LjI3NzE4NSA3NjEuOTA1ODM1IDc3MS42MDEwMDUgNjQ2LjczNDA5NCA2MzUuNDg3NzM3IDYwMi41MjU3OTdjMjcuMjgzNDcyLTEzLjQ5ODkwNCA1Mi40NzcxOTUtMzEuNTAzOTI4IDc0LjYzMjAyNS01My42NTg3NTggNTMuMzQ0NDI1LTUzLjM0NDQyNSA4Mi43MjE3NDMtMTI0LjI2NzkzOCA4Mi43MjE3NDMtMTk5LjcwNzgwOSAwLTc1LjQzOTg3MS0yOS4zNzczMTgtMTQ2LjM2NDQwNy04Mi43MjE3NDMtMTk5LjcwNzgwOXMtMTI0LjI2ODk2Mi04Mi43MjE3NDMtMTk5LjcwODgzMy04Mi43MjE3NDMtMTQ2LjM2NDQwNyAyOS4zNzczMTgtMTk5LjcwNzgwOSA4Mi43MjE3NDNTMjI3Ljk4MTM3OCAyNzMuNzE5MzU5IDIyNy45ODEzNzggMzQ5LjE1ODIwNmMwIDc1LjQzOTg3MSAyOS4zNzczMTggMTQ2LjM2NDQwNyA4Mi43MjE3NDMgMTk5LjcwNzgwOSAyMi4xODY1NzEgMjIuMTg2NTcxIDQ3LjQyMjI3MyA0MC4yMTEwNDggNzQuNzUxODIgNTMuNzE3MTItMTM2LjAzNDQyOCA0NC4yNTIzMjQtMjUwLjYzNDg0MSAxNTkuMzkyMzI0LTMwOC4zNTQzMjggMzE3Ljg0Njc2OS0yLjc0NTAzNyA3LjUzMzc0OC0xLjY0MDI2NCAxNS45MzM3MDMgMi45NTgwMDUgMjIuNTAyOTUyIDQuNTk4MjY5IDYuNTY4MjI0IDEyLjExMjU2MyAxMC40ODA0OSAyMC4xMzE2MzMgMTAuNDgwNDlsODIwLjc0MzQwNSAwYzguMDE4MDQ2IDAgMTUuNTMyMzQtMy45MTIyNjYgMjAuMTMwNjA5LTEwLjQ4MDQ5Qzk0NS42NjI1MzQgOTM2LjM2MzYwNyA5NDYuNzY2MjgyIDkyNy45NjQ2NzYgOTQ0LjAyMjI3IDkyMC40Mjk5MDR6TTI3Ny4xMjc4NzQgMzQ5LjE1ODIwNmMwLTYyLjMxMTYxMyAyNC4yNjYwODItMTIwLjg5NTI2IDY4LjMyNjkzOS0xNjQuOTU2MTE3IDQ0LjA2MDg1Ny00NC4wNjE4ODEgMTAyLjY0NDUwNC02OC4zMjY5MzkgMTY0Ljk1NjExNy02OC4zMjY5MzlzMTIwLjg5NTI2IDI0LjI2NjA4MiAxNjQuOTU2MTE3IDY4LjMyNjkzOWM0NC4wNjE4ODEgNDQuMDYwODU3IDY4LjMyNjkzOSAxMDIuNjQ0NTA0IDY4LjMyNjkzOSAxNjQuOTU2MTE3IDAgNjIuMzEyNjM3LTI0LjI2NTA1OCAxMjAuODk1MjYtNjguMzI2OTM5IDE2NC45NTYxMTctNDQuMDYwODU3IDQ0LjA2MTg4MS0xMDIuNjQzNDggNjguMzI2OTM5LTE2NC45NTYxMTcgNjguMzI2OTM5LTYyLjMxMTYxMyAwLTEyMC44OTUyNi0yNC4yNjUwNTgtMTY0Ljk1NjExNy02OC4zMjY5MzlDMzAxLjM5Mzk1NiA0NzAuMDUzNDY2IDI3Ny4xMjc4NzQgNDExLjQ3MDg0MyAyNzcuMTI3ODc0IDM0OS4xNTgyMDZ6TTEzNi40NzU3MjMgOTA0LjI2Njg1YzMzLjE0MDA5Ni03NS43ODc5OTIgODEuNTExNTExLTE0MC4zMTczNCAxNDEuMjM3ODEzLTE4OC4wNDE2NTkgNjkuMTQ4MDk1LTU1LjI1Mjk0OCAxNDkuNjY1NDEzLTg0LjQ1NzIyOSAyMzIuODQ3OTA1LTg0LjQ1NzIyOSA4My4xODE0NjggMCAxNjMuNjk4Nzg2IDI5LjIwNDI4MSAyMzIuODQ2ODgxIDg0LjQ1NzIyOSA1OS43MjczMjcgNDcuNzI0MzE5IDEwOC4wOTg3NDEgMTEyLjI1NDY5MSAxNDEuMjM4ODM3IDE4OC4wNDE2NTlMMTM2LjQ3NTcyMyA5MDQuMjY2ODV6IiBwLWlkPSIxMDMzNiIgZmlsbD0iI2JiYmJiYiI+PC9wYXRoPjwvc3ZnPg=='},
    email: String,
    psw: String,
    create_time: Number,
    productions: [{type: Schema.Types.ObjectId, ref: 'production'}],
    fans: [{type: Schema.Types.ObjectId, ref: 'user'}],
    attentions: [{type: Schema.Types.ObjectId, ref: 'user'}],
    collect: [{type: Schema.Types.ObjectId, ref: 'production'}],
    comments: [{type: Schema.Types.ObjectId,ref: 'comwall'}],
    activation: {type: Boolean, default: false},
    personalInfo: {type: String, default: '暂无该up主信息'}
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