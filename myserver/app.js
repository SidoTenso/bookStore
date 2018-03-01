const express = require('express'),
    app = express();

app.use(express.static('myserver/public'));

// app.get('/',(req,res) => {
//     res.send('这不是服务器');
// }) 
app.listen(3000,()=> {
    console.log('\n-----------------------------后台服务器已开启于3000端口-----------------------------\n');
})